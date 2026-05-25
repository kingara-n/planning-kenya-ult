export type Member = {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  zoom?: boolean;
  studies: string[];
  academic_history: string[];
  academic_career: string[];
};

export type Dept = {
  title: string;
  members: Member[];
};

export const departments: Dept[] = [
  {
    title: "Architectural Staff",
    members: [
      {
        slug: "henry-musangi",
        name: "Henry Musangi",
        role: "Managing Director",
        img: "/assets/images/staff/HENRY-MUSANGI-Copy.jpg",
        bio: "Henry leads Planning Systems Services with three decades of experience shaping civic, commercial and residential architecture across East Africa. He balances rigorous planning discipline with a quiet, contextual design sensibility, guiding the practice's long-term vision and client relationships.",
        studies: [
          "Bachelor of Architecture (First Class Honours) — University of Nairobi",
          "Master of Urban Design & Spatial Planning — Harvard Graduate School of Design",
          "Registered Architect — Board of Registration of Architects and Quantity Surveyors (BORAQS)"
        ],
        academic_history: [
          "Published 'The Resilient African Metropolis' in the Journal of African Urbanism (2018).",
          "Guest lecturer on tropical architecture and climate-conscious master planning at the University of Nairobi and JKUAT.",
          "Lead researcher on the United Nations Habitat III delegation for regional urban development strategies."
        ],
        academic_career: [
          "Joined Planning Systems Services in 1994, advancing to Managing Director in 2012.",
          "Chief Architect for the award-winning Trade & Development Bank Headquarters (TDB) in Nairobi.",
          "Directed the urban regeneration proposals for the Nairobi Riverfront Masterplan.",
          "Pioneered the integration of passive cooling design guidelines for high-density commercial towers in equatorial zones."
        ]
      },
      {
        slug: "mumo-musuva",
        name: "Mumo Musuva",
        role: "Director",
        img: "/assets/images/staff/MUMO-MUSUVA-min.jpg",
        bio: "Mumo brings deep expertise in large-scale architectural delivery, overseeing complex briefs from concept through completion. His work focuses on integrating environmental responsibility with the cultural and material context of each site.",
        studies: [
          "Bachelor of Architecture (Honours) — Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
          "M.Sc. in Sustainable Environmental Design — Architectural Association School of Architecture (AA), London"
        ],
        academic_history: [
          "Thesis research on 'Thermal Performance of Vernacular Grille Systems in Coastal Kenya'.",
          "Regular panelist at East African Institute of Architects (EAIA) academic symposia.",
          "Developed teaching modules on sustainable construction methodologies for vocational colleges."
        ],
        academic_career: [
          "Director at Planning Systems Services, overseeing commercial and hospitality divisions.",
          "Project Director for the Mombasa Serena Beach Hotel & Spa major conservation expansions.",
          "Supervised the engineering and envelope design for the energy-efficient I&M Bank Tower.",
          "Spearheaded environmental compliance strategies for major master-planning schemes in Rwanda."
        ]
      },
      {
        slug: "susan-makhulo",
        name: "Susan Makhulo",
        role: "Studio Director",
        img: "/assets/images/staff/sus-min.jpg",
        bio: "Susan directs the studio's day-to-day creative output, ensuring every project meets the practice's standards for craft and clarity. She mentors emerging architects and shapes the design culture across all four divisions.",
        studies: [
          "Bachelor of Architecture — University of Nairobi",
          "Certificate in Project Management and Creative Leadership — Edinburgh Business School"
        ],
        academic_history: [
          "Conducted research on 'The Evolution of Shared Workspace Geometries in East Africa'.",
          "Mentorship director for the Planning Systems-University of Nairobi Graduate Internship Fellowship.",
          "Organized the annual East African Women in Architecture Forum (2021)."
        ],
        academic_career: [
          "Studio Director at Planning Systems, coordinating design teams across commercial and interior projects.",
          "Lead designer on Strathmore Business School project, emphasizing learning-conducive lighting design.",
          "Spearheaded interior zoning standards for regional banking institutions, including Diamond Trust Bank.",
          "Coordinates technical documentation workflows and standards across the Mombasa and Nairobi studios."
        ]
      },
      {
        slug: "michael-kinyumu",
        name: "Michael Kinyumu",
        role: "Associate Director",
        img: "/assets/images/staff/MICHAELKINYUMU-min.jpg",
        bio: "Michael partners with clients on commercial and institutional projects, translating ambitious programmes into buildable, beautifully detailed architecture. His leadership pairs technical precision with a calm, collaborative approach.",
        studies: [
          "Bachelor of Architecture — University of Nairobi",
          "Advanced Diploma in Construction Law and Arbitration — Chartered Institute of Arbitrators"
        ],
        academic_history: [
          "Researched 'Precast Structural Optimization in High-Density Residential Developments'.",
          "Guest lecturer on building regulations and construction safety compliance at Technical University of Kenya."
        ],
        academic_career: [
          "Associate Director with two decades of tenure at Planning Systems Services.",
          "Project Manager for the high-rise KCB Pension Tower in Nairobi's Upper Hill district.",
          "Supervised technical execution of precast structures at the Pangani Housing Redevelopment project.",
          "Expert advisor on contractual dispute resolutions and construction legal frameworks within East Africa."
        ]
      },
      {
        slug: "felix-kawuondi",
        name: "Felix Kawuondi",
        role: "Licentiate Architect",
        img: "/assets/images/staff/felix.png",
        bio: "Felix contributes to design development and documentation across a range of residential and mixed-use projects. He is interested in the intersection of vernacular building traditions and contemporary practice.",
        zoom: true,
        studies: [
          "Bachelor of Architectural Studies — University of Nairobi",
          "Postgraduate Diploma in Professional Practice — Board of Registration of Architects and Quantity Surveyors (BORAQS)"
        ],
        academic_history: [
          "Academic thesis: 'Adaptation of Swahili Grille Work in Modern Coastal Residences'.",
          "Co-facilitated workshops on historic preservation of monument structures in Old Town Mombasa."
        ],
        academic_career: [
          "Licentiate Architect contributing to high-end residential masterplans at Planning Systems.",
          "Key design team member for the Zanzibar Coastal Resorts project.",
          "Developed complex 3D BIM models for the Jomo Kenyatta Public Beach proposal.",
          "Dedicated focus on climate-conscious material lifecycles and circular supply chains."
        ]
      }
    ]
  },
  {
    title: "Arts & Graphics",
    members: [
      {
        slug: "william-omondi",
        name: "William Omondi",
        role: "Graphics Lead",
        img: "/assets/images/staff/William-Omondi2-min.jpg",
        bio: "William shapes how Planning Systems' work is communicated — from project visualisations and presentation books to wayfinding and brand systems. His craft brings precision and warmth to every visual the studio sends out.",
        studies: [
          "Bachelor of Fine Arts & Graphic Design — Kenyatta University",
          "Advanced Certification in Architectural Visualization & 3D Render Engines — Autodesk Academy"
        ],
        academic_history: [
          "Curator for the 'Visualizing African Skylines' exhibit (Nairobi Gallery, 2022).",
          "Developed instructional guidelines for digital landscape sketching utilized by local universities."
        ],
        academic_career: [
          "Graphics Lead at Planning Systems, directing visual communication strategy.",
          "Crafted presentation books and renders for the World Design Impact Prize-winning Community Cooker.",
          "Designed comprehensive signage, brand typography, and wayfinding systems for the Nation Centre refits."
        ]
      }
    ]
  },
  {
    title: "Finance",
    members: [
      {
        slug: "moses-kinyanjui",
        name: "Moses Kinyanjui",
        role: "Director of Finance and Operations",
        img: "/assets/images/staff/Moses-min.jpg",
        bio: "Moses oversees the firm's financial strategy and operational health, keeping projects resourced and the business resilient. His steady stewardship gives the design teams the freedom to focus on the work.",
        studies: [
          "Bachelor of Commerce (Finance Option) — University of Nairobi",
          "Certified Public Accountant (CPA-K) — KASNEB",
          "Executive MBA in Strategic Management — United States International University (USIU)"
        ],
        academic_history: [
          "Academic researcher on 'Capital Allocation Models in Professional Service Firms'.",
          "Presenter on commercial risk mitigation strategies at the Kenya Institute of Management."
        ],
        academic_career: [
          "Director of Finance at Planning Systems, structuring capital allocation and operations.",
          "Maintained financial stability through major economic shifts, ensuring zero operational downtime.",
          "Designed financial templates for long-term project staging, enabling the gradual delivery of major masterplans."
        ]
      },
      {
        slug: "dennis-kirimi",
        name: "Dennis Kirimi",
        role: "Senior Accountant",
        img: "/assets/images/staff/Dennis-Kirimi-Copy-scaled.jpg",
        bio: "Dennis manages the day-to-day accounting and reporting that keep every project on solid financial footing. He is known across the studio for his accuracy and quiet reliability.",
        studies: [
          "Bachelor of Business Administration (Accounting & Finance) — Mount Kenya University",
          "Certified Public Accountant (CPA) — KASNEB"
        ],
        academic_history: [
          "Completed academic study: 'Internal Control Systems and Financial Viability in Construction Services'."
        ],
        academic_career: [
          "Senior Accountant at Planning Systems, coordinating audit and ledger accounts.",
          "Developed in-house automated tracking systems for project expense auditing.",
          "Maintains meticulous compliance structures across cross-border regional contracts."
        ]
      }
    ]
  },
  {
    title: "Human Resources & Administration",
    members: [
      {
        slug: "victoria-awiti",
        name: "Victoria Awiti",
        role: "Associate Director, HR",
        img: "/assets/images/staff/Victoria-Awiti-Copy.jpg",
        bio: "Victoria leads people and culture at Planning Systems, building the structures that support a multidisciplinary studio. His work spans recruitment, professional development and the rituals that keep the team connected.",
        studies: [
          "B.Sc. in Human Resource Management — Moi University",
          "Higher Diploma in Human Resource Management — IHRM Kenya",
          "M.Sc. in Organizational Development — United States International University (USIU)"
        ],
        academic_history: [
          "Thesis paper: 'Managing Talent in Dynamic Creative Fields'.",
          "Advisory board member for the Institute of Human Resource Management (IHRM) Kenya."
        ],
        academic_career: [
          "Associate Director of HR at Planning Systems, designing studio cultural guidelines.",
          "Instituted the annual Professional Mentorship Program, linking junior designers with associates.",
          "Developed studio safety and structural health systems during regional workspace transitions."
        ]
      },
      {
        slug: "ednah-mueni",
        name: "Ednah Mueni",
        role: "Administrative Assistant",
        img: "/assets/images/staff/ednah.png",
        bio: "Ednah keeps the studio running smoothly, coordinating logistics, hospitality and the small daily details that make the office feel like a workshop.",
        zoom: true,
        studies: [
          "Bachelor of Office Administration and Technology — Technical University of Kenya",
          "Certificate in Customer Relations & Hospitality Operations — PrideInn Hospitality School"
        ],
        academic_history: [
          "Academic project: 'The Impact of Physical Workplace Ergonomics on Studio Performance'."
        ],
        academic_career: [
          "Administrative Coordinator at Planning Systems, managing executive office workflows.",
          "Supervises studio scheduling, hospitality programs, and corporate reception events.",
          "Coordinates international travel and accommodation structures for site survey teams."
        ]
      }
    ]
  },
  {
    title: "Information Technology",
    members: [
      {
        slug: "chris-sigoli",
        name: "Chris Sigoli",
        role: "Head of Digital",
        img: "/assets/images/staff/Chris-min.jpg",
        bio: "Chris leads the firm's digital infrastructure and design technology — from BIM workflows and visualisation pipelines to the systems that connect the studio's four divisions. His work quietly powers everything the practice ships.",
        studies: [
          "B.Sc. in Computer Science — Jomo Kenyatta University of Agriculture and Technology (JKUAT)",
          "Certified Building Information Modeling (BIM) Manager — Autodesk International"
        ],
        academic_history: [
          "Published 'BIM Adaptation Curves in Developing Architectural Ecosystems' (2020).",
          "Key speaker at the Digital Construction Africa summit on cloud rendering setups."
        ],
        academic_career: [
          "Head of Digital Systems at Planning Systems, integrating high-performance cloud clusters.",
          "Designed the internal BIM protocol, standardizing coordination between architectural and structural models.",
          "Created secure remote workspace servers connecting Nairobi, Mombasa, and regional project sites."
        ]
      },
      {
        slug: "eric-ngugi",
        name: "Eric Ngugi",
        role: "Assistant IT",
        img: "/assets/images/staff/2023-09-29/Eric Ngugi.png",
        bio: "Eric supports the studio's hardware, software and design-tech needs, keeping every workstation, plotter and server humming. He is the team's first call when technology gets in the way of design.",
        studies: [
          "Diploma in Information Technology — Technical University of Kenya",
          "Certified Network Associate (CCNA) — Cisco Academy"
        ],
        academic_history: [
          "Completed research study: 'Network Security Architectures in High-Data Creative Studios'."
        ],
        academic_career: [
          "Assistant IT Administrator at Planning Systems, managing systems deployments.",
          "Supervises security firewalls, internal NAS backup storage systems, and system licensing.",
          "Maintains high-speed data feeds to support heavy architectural 3D rendering jobs."
        ]
      }
    ]
  }
];

export function getTeamMember(slug: string): Member | undefined {
  return departments
    .flatMap(d => d.members)
    .find(m => m.slug === slug);
}
