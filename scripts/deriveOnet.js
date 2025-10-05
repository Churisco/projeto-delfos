/*
 Script: deriveOnet.js
 Objetivo: gerar pesos de aptidões (contínuos 0-1) a partir de arquivos ONET.
 Saídas:
   - data/onet_processed.json (intermediário com elementos agregados por profissão)
   - (log) preview de um objeto professions_v2_onet sugerido

 Etapas:
 1. Mapear profissões internas -> códigos ONET (lista inicial manual)
 2. Ler arquivos relevantes (Abilities.txt, Skills.txt) em db_30_0_text
 3. Filtrar registros dos códigos desejados
 4. Mapear elementos ONET -> aptidões internas via dicionário de padrões
 5. Agregar Importance (e opcionalmente combinar com Level se disponível) -> score bruto
 6. Normalizar por aptidão dividindo pelo maior bruto entre as profissões (min-max apenas no max)
 7. Gerar estrutura de saída

 Observações:
 - Os arquivos ONET fornecidos parecem ser TSV (tab separated). Este script assume separador de tab '\t'.
 - Caso a estrutura real seja diferente, ajustar parser.
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
// Os arquivos ONET estão como pasta irmã do projeto (../db_30_0_text)
const ONET_DIR = path.resolve(ROOT, '..', 'db_30_0_text');
const OUTPUT_DIR = path.join(ROOT, 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'onet_processed.json');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// 1. Mapeamento profissões -> possíveis códigos ONET (placeholder inicial)
// TODO: Refinar códigos usando referência oficial ONET.
const professionOnetCodes = {
  administracao: ['11-3013', '11-1021'], // Administrative Services / General Manager
  biologia: ['19-1029', '19-1021'], // Biological Scientists, Biochemists
  ciencia_computacao: ['15-1299', '15-1252'], // Computer Occupations, Software Dev
  economia: ['19-3011', '19-3010'], // Economists
  design_grafico: ['27-1024'], // Graphic Designers
  design_interiores: ['27-1025'], // Interior Designers
  direito: ['23-1011', '23-1012'], // Lawyers, Judicial
  educacao_fisica: ['27-2022', '27-2023'], // Coaches / Umpires (aproximado)
  engenharia_mecanica: ['17-2141'],
  engenharia_civil: ['17-2051'],
  engenharia_software: ['15-1252'],
  filosofia: ['25-1126'], // Philosophy and Religion Teachers
  geografia: ['25-1064'], // Geography Teachers
  historia: ['25-1125'], // History Teachers
  letras: ['25-1081'], // Education Teachers (approx for languages) placeholder
  medicina: ['29-1210', '29-1229'], // Physicians / Surgeons
  musica: ['27-2042'], // Musicians and Singers
  pedagogia: ['25-2021'], // Elementary School Teachers
  psicologia: ['19-3033'], // Psychologists
  rel_internacionais: ['19-3099', '11-1031'] // Political Scientists (aprox), Public Relations/General Manager overlap
};

// 2. Arquivos alvo (expandido para capturar mais elementos)
const TARGET_FILES = ['Abilities.txt', 'Skills.txt', 'Knowledge.txt', 'Interests.txt', 'Work Values.txt'];

// 3. Mapeamento de strings ONET (Element Name) -> aptidões internas (regex case-insensitive)
// Ajustar/expandir conforme necessário.
const elementMapping = [
  { regex: /reasoning|logic|problem|analysis|analytical|deductive|inductive/i, aptitude: 'logica' },
  { regex: /mathemat|number facility|quantitative/i, aptitude: 'matematica' },
  { regex: /written comprehension|reading|comprehension|text|interpretation/i, aptitude: 'interpretacao' },
  { regex: /written expression|writing|composition/i, aptitude: 'escrita' },
  { regex: /spatial|visualization|visual|orient/i, aptitude: 'espacial' },
  { regex: /attention|detail|focus|order|selective attention/i, aptitude: 'detalhes' },
  { regex: /memory|memorization|recall/i, aptitude: 'memoria' },
  { regex: /speed|processing speed|perceptual speed|reaction time/i, aptitude: 'velocidade' },
  { regex: /problem solving|solve|troubleshoot|critical thinking/i, aptitude: 'problemas' },
  { regex: /creativ|originality|innovation|fluency of ideas/i, aptitude: 'criatividade' },
  { regex: /finger|manual dexterity|arm-hand steadiness|wrist-finger speed|fine motor/i, aptitude: 'coord_fina' },
  { regex: /artistic|design|drawing|graphic|fine arts|aesthetics|visual arts/i, aptitude: 'artistica' },
  { regex: /music|rhythm|auditory attention|hearing sensitivity|sound|musical|audio/i, aptitude: 'musica' },
  { regex: /physical|stamina|fitness|body coordination|gross body|athletic|sports|strength|endurance/i, aptitude: 'esportes' },
  { regex: /nature|biology|environment|ecology|realistic|natural|outdoor|plant|animal/i, aptitude: 'natureza' },
  { regex: /technology|computers|programming|software|systems analysis|technical|digital|hardware/i, aptitude: 'tecnologia' },
  { regex: /organizing|planning|time management|coordination|systematization/i, aptitude: 'organizacao' },
  { regex: /leadership|influencing|persuasion|supervision|management|guidance/i, aptitude: 'lideranca' },
  { regex: /teaching|instructing|training|education|pedagogy|mentoring/i, aptitude: 'didatica' },
  { regex: /initiative|entrepreneur|starting|enterprising|independence|self-directed|business|sales|marketing|management|administration|negotiat|supervis|lead|direct/i, aptitude: 'empreendedorismo' },
  { regex: /curious|learning|updating knowledge|research|investigative|exploration|inquisitive/i, aptitude: 'curiosidade' },
  { regex: /speaking|oral expression|communication|oral comprehension|social|interpersonal|verbal/i, aptitude: 'comunicacao' }
];

function mapElementToAptitude(elementName) {
  for (const m of elementMapping) {
    if (m.regex.test(elementName)) return m.aptitude;
  }
  return null; // não mapeado
}

// 4. Parser genérico TSV (assume cabeçalho)
function parseTsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8').replace(/\r/g, '');
  const lines = raw.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split('\t');
  return lines.slice(1).map(line => {
    const cols = line.split('\t');
    const obj = {};
    header.forEach((h, i) => { obj[h.trim()] = cols[i]; });
    return obj;
  });
}

// 5. Carregar dados ONET dos arquivos alvo
const onetData = {};
for (const f of TARGET_FILES) {
  const p = path.join(ONET_DIR, f);
  onetData[f] = parseTsv(p);
}

// 6. Agregar por profissão
const aptitudesSet = new Set(elementMapping.map(m => m.aptitude));

function safeNumber(v) {
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
}

// Função para extrair Importance e Level (quando existir) com normalização por arquivo
function extractScores(record, fileName) {
  // Tentativas de campos comuns
  const importance = safeNumber(record.Importance || record['Data Value'] || record['Importance']);
  const level = safeNumber(record.Level || record['Level']);
  
  // Normalização baseada no tipo de arquivo
  let normalizedScore = importance;
  
  if (fileName === 'Knowledge.txt' || fileName === 'Interests.txt' || fileName === 'Work Values.txt') {
    // Arquivos com escala 0-7, normalizar dividindo por 7
    normalizedScore = importance ? importance / 7 : null;
  } else {
    // Abilities.txt e Skills.txt usam escala 0-5, normalizar dividindo por 5
    normalizedScore = importance ? importance / 5 : null;
  }
  
  return { importance, level, normalizedScore };
}

// Estrutura de acumulação
const professionAggregation = {};
for (const profId of Object.keys(professionOnetCodes)) {
  professionAggregation[profId] = { raw: {}, elements: [] };
  for (const a of aptitudesSet) professionAggregation[profId].raw[a] = { sum: 0, count: 0 };
}

// Normaliza código (remove parte decimal e zeros, ex: 11-1011.00 -> 11-1011)
function normalizeCode(code) {
  return code.split('.')[0];
}

// Pré-processa lista normalizada das profissões
const professionOnetCodesNormalized = Object.fromEntries(
  Object.entries(professionOnetCodes).map(([k, list]) => [k, list.map(normalizeCode)])
);

function considerRecord(rec, fileLabel) {
  const occCode = rec['O*NET-SOC Code'];
  if (!occCode) return;
  
  // Tratamento específico por arquivo
  let scaleId, elementName, importance;
  
  if (fileLabel === 'Knowledge.txt') {
    elementName = rec['Element Name'];
    importance = safeNumber(rec['Data Value']);
    // Knowledge.txt usa escala 0-7, não tem Scale ID
  } else if (fileLabel === 'Interests.txt') {
    elementName = rec['RIASEC Interest Area'];
    importance = safeNumber(rec['Data Value']);
    // Interests.txt usa escala 0-7, não tem Scale ID
  } else if (fileLabel === 'Work Values.txt') {
    elementName = rec['Work Value'];
    importance = safeNumber(rec['Data Value']);
    // Work Values.txt usa escala 0-7, não tem Scale ID
  } else {
    // Abilities.txt e Skills.txt
    scaleId = rec['Scale ID'];
    // Filtra somente linhas de importância (IM) para evitar duplicidade LV
    if (scaleId !== 'IM') return;
    elementName = rec['Element Name'];
    importance = safeNumber(rec['Data Value']);
  }
  
  if (!elementName || importance == null) return;
  
  const aptitude = mapElementToAptitude(elementName);
  if (!aptitude) return;
  
  // Normalização baseada no tipo de arquivo
  let baseScore;
  if (fileLabel === 'Knowledge.txt' || fileLabel === 'Interests.txt' || fileLabel === 'Work Values.txt') {
    // Escala 0-7, normalizar dividindo por 7
    baseScore = importance / 7;
  } else {
    // Abilities.txt e Skills.txt usam escala 0-5
    baseScore = importance / 5;
  }
  
  const occNorm = normalizeCode(occCode);
  for (const [profId, codes] of Object.entries(professionOnetCodesNormalized)) {
    if (codes.includes(occNorm)) {
      const agg = professionAggregation[profId];
      agg.raw[aptitude].sum += baseScore;
      agg.raw[aptitude].count += 1;
      agg.elements.push({ 
        file: fileLabel, 
        occCode, 
        elementName, 
        aptitude, 
        importance_raw: importance, 
        baseScore 
      });
    }
  }
}

for (const [fileName, records] of Object.entries(onetData)) {
  for (const rec of records) considerRecord(rec, fileName);
}

// 7. Calcular médias por aptidão e encontrar máximos globais para normalização
const globalMaxPerAptitude = {};
for (const a of aptitudesSet) globalMaxPerAptitude[a] = 0;

for (const [profId, agg] of Object.entries(professionAggregation)) {
  agg.avg = {};
  for (const a of Object.keys(agg.raw)) {
    const r = agg.raw[a];
    const avg = r.count > 0 ? r.sum / r.count : 0;
    agg.avg[a] = avg; // já entre 0-1 teoricamente
    if (avg > globalMaxPerAptitude[a]) globalMaxPerAptitude[a] = avg;
  }
}

// 8. Normalização final (dividir pelo máximo observado; se máximo = 0 mantém 0)
for (const [profId, agg] of Object.entries(professionAggregation)) {
  agg.normalized = {};
  for (const [a, val] of Object.entries(agg.avg)) {
    const max = globalMaxPerAptitude[a] || 0;
    agg.normalized[a] = max > 0 ? +(val / max).toFixed(3) : 0;
  }
}

// 9. Construir objeto de saída compacto para cada profissão (somente aptidões com valor > 0)
const professions_v2_onet = {};
for (const [profId, agg] of Object.entries(professionAggregation)) {
  const req = {};
  for (const [a, val] of Object.entries(agg.normalized)) {
    if (val > 0) req[a] = val; // contínuo
  }
  professions_v2_onet[profId] = { req, meta: { totalElements: agg.elements.length } };
}

// 10. Salvar JSON intermediário
const output = { generatedAt: new Date().toISOString(), globalMaxPerAptitude, data: professionAggregation, professions_v2_onet };
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

console.log('Gerado arquivo intermediário:', OUTPUT_FILE);
console.log('Prévia professions_v2_onet (req truncado):');
for (const [p, obj] of Object.entries(professions_v2_onet)) {
  const short = Object.fromEntries(Object.entries(obj.req).slice(0, 5));
  console.log(p, short, '...');
}

console.log('\nPróximos passos sugeridos:');
console.log('- Revisar data/onet_processed.json');
console.log('- Ajustar mapping de element names se necessário');
console.log('- Integrar professions_v2_onet em lib/data.ts gerando professions_v2_onet export');
