// /Users/rocky/Documents/dj-rocky-website-main/app/components/VenueMap.tsx

'use client'

// Temporarily commented out - will be restored later
// export default function VenueMap({ selectedSection, onSelectSection }: { 
//   selectedSection: string | null, 
//   onSelectSection: (section: string) => void 
// }) {
//   const sections = ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112']
//   return (
//     <div className="relative w-full aspect-square max-w-md mx-auto">
//       <svg viewBox="0 0 400 400" className="w-full h-full">
//         <ellipse cx="200" cy="200" rx="180" ry="120" fill="#f0f0f0" stroke="#ccc" strokeWidth="2" />
//         <text x="200" y="200" textAnchor="middle" fontSize="16" fill="#888">Stage</text>
//         {sections.map((sec, i) => {
//           const angle = (i / sections.length) * 2 * Math.PI - Math.PI / 2
//           const x = 200 + 130 * Math.cos(angle)
//           const y = 200 + 80 * Math.sin(angle)
//           const isSelected = selectedSection === sec
//           return (
//             <g key={sec} onClick={() => onSelectSection(sec)} style={{ cursor: 'pointer' }}>
//               <circle cx={x} cy={y} r="18" fill={isSelected ? '#2563eb' : '#e5e7eb'} stroke="#999" strokeWidth="1.5" />
//               <text x={x} y={y+2} textAnchor="middle" fontSize="10" fill={isSelected ? 'white' : '#333'}>{sec}</text>
//             </g>
//           )
//         })}
//       </svg>
//     </div>
//   )
// }

// Placeholder export to prevent import errors
export default function VenueMap() {
  return null
}