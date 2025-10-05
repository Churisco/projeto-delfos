export default function TemploSVG() {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 600" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      {/* Escadas da base (múltiplos degraus) */}
      <rect x="50" y="520" width="700" height="20" fill="#c4c4c4" />
      <rect x="70" y="500" width="660" height="20" fill="#d1d1d1" />
      <rect x="90" y="480" width="620" height="20" fill="#c4c4c4" />
      <rect x="110" y="460" width="580" height="20" fill="#d1d1d1" />
      <rect x="130" y="440" width="540" height="20" fill="#c4c4c4" />
      <rect x="150" y="420" width="500" height="20" fill="#d1d1d1" />
      
      {/* Plataforma principal do templo */}
      <rect x="170" y="380" width="460" height="40" fill="#e8e8e8" />
      
      {/* Colunas principais (6 colunas como na imagem) */}
      <rect x="200" y="180" width="50" height="200" fill="#f5f5f5" />
      <rect x="270" y="180" width="50" height="200" fill="#f5f5f5" />
      <rect x="340" y="180" width="50" height="200" fill="#f5f5f5" />
      <rect x="410" y="180" width="50" height="200" fill="#f5f5f5" />
      <rect x="480" y="180" width="50" height="200" fill="#f5f5f5" />
      <rect x="550" y="180" width="50" height="200" fill="#f5f5f5" />
      
      {/* Sombras das colunas para dar profundidade */}
      <rect x="240" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      <rect x="310" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      <rect x="380" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      <rect x="450" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      <rect x="520" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      <rect x="590" y="180" width="10" height="200" fill="#1f2937" opacity="0.2" />
      
      {/* Arquitrave (viga horizontal sobre as colunas) */}
      <rect x="180" y="160" width="440" height="25" fill="#e8e8e8" />
      
      {/* Frontão triangular */}
      <polygon points="400,80 160,160 640,160" fill="#e8e8e8" />
      
      {/* Círculo no centro do frontão com símbolo χ (chi) */}
      <circle cx="400" cy="120" r="25" fill="#374151" />
      <text x="400" y="130" textAnchor="middle" fontSize="28" fill="white" fontWeight="bold">χ</text>
      
      {/* Porta central preta (área clicável) */}
      <rect x="360" y="260" width="80" height="120" fill="#000000" className="cursor-pointer transition-opacity hover:opacity-80" />
      
      {/* Detalhes arquitetônicos - frisos */}
      <rect x="180" y="155" width="440" height="3" fill="#d1d1d1" />
      <rect x="180" y="185" width="440" height="3" fill="#d1d1d1" />
    </svg>
  );
}