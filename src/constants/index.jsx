import {
  Clock,
  Home,
  Tv,
  BookOpen,
  Pencil,
  HelpCircle,
  Layers,
  Folder,
  CalendarCheck,
  Send,
} from "lucide-react";

export const schoolRules = {
  homeworkAndHomeStudy: [
    {
      id: 1,
      icon: <Clock className="text-blue-500" />,
      title: "Plan a daily homework time",
    },
    {
      id: 2,
      icon: <Home className="text-green-500" />,
      title: "Take home everything you will need",
    },
    {
      id: 3,
      icon: <Tv className="text-red-500" />,
      title: "Don't study with the TV on",
    },
    {
      id: 4,
      icon: <BookOpen className="text-indigo-500" />,
      title: "Read and follow all directions",
    },
    {
      id: 5,
      icon: <Pencil className="text-yellow-500" />,
      title: "Do your work neatly and carefully",
    },
    {
      id: 6,
      icon: <HelpCircle className="text-orange-500" />,
      title: "Ask for help if you need it, but do the work yourself",
    },
    {
      id: 7,
      icon: <Layers className="text-purple-500" />,
      title: "Keep the top of your desk uncluttered",
    },
    {
      id: 8,
      icon: <Folder className="text-pink-500" />,
      title: "Keep your homework in a special place",
    },
    {
      id: 9,
      icon: <CalendarCheck className="text-teal-500" />,
      title: "Get into a routine by studying at the same time every day",
    },
    {
      id: 10,
      icon: <Send className="text-rose-500" />,
      title: "Return homework on time",
    },
  ],
  toAndFromSchool: [
    {
      id: 1,
      icon: "⏰",
      title:
        "Classes begin at 9:30 a.m. The students must arrive between 9:15 to 9:25 a.m.",
    },
    {
      id: 2,
      icon: "🚫",
      title:
        "Students are not allowed to leave the classroom without permission anytime.",
    },
    {
      id: 3,
      icon: "📤",
      title:
        "Students are dismissed at 12:30 p.m. Parents of students under age 6 must check with the teacher place of student dismissal.",
    },
    {
      id: 4,
      icon: "📄",
      title:
        "Absences and tardies must be verified by a note. Three absences or tardies without a note may result in suspension.",
    },
  ],
  generalRules: [
    {
      id: 1,
      icon: "🗣️",
      title:
        "Vulgar or profane language is prohibited and may result in a suspension.",
    },
    {
      id: 2,
      icon: "📵",
      title:
        "No toys, ipods, or electronic games are allowed while you are in the school.",
    },
    {
      id: 3,
      icon: "🚧",
      title: "No climbing on or over any fence.",
    },
    {
      id: 4,
      icon: "🏫",
      title:
        "Students are to keep classroom, bathroom, and Gurdwara premises neat and clean.",
    },
    {
      id: 5,
      icon: "👔",
      title: "Students must wear school uniform.",
    },
  ],
  disciplinePolicies: [
    {
      id: 1,
      icon: "🗣️",
      title: "Verbal warning",
    },
    {
      id: 2,
      icon: "📞👨‍👩‍👧",
      title: "Parent notification or conferences",
    },
    {
      id: 3,
      icon: "⛔",
      title: "Suspension",
    },
  ],
  classroomRules: [
    {
      id: 1,
      icon: "👂",
      title: "Listen carefully.",
    },
    {
      id: 2,
      icon: "📋",
      title: "Follow directions.",
    },
    {
      id: 3,
      icon: "🤫",
      title: "Work quietly. Do not disturb others who are working.",
    },
    {
      id: 4,
      icon: "🤝",
      title: "Respect others. Be kind with your words and actions.",
    },
    {
      id: 5,
      icon: "🏫",
      title: "Respect school and personal property.",
    },
    {
      icon: "🔇",
      title: "Be quiet all times. Raise your hand if need to speak.",
    },
  ],
};

export const courses = [
  {
    department: "Punjabi Department",
    ageGroups: [
      {
        age: "Ages 5 and up",
        courses: [
          { name: "Level I to V", description: "Progressive learning levels" },
          { name: "Gurmukhi", description: "Punjabi script and language" },
          {
            name: "Sikh Theology",
            description: "Religious studies and philosophy",
          },
          {
            name: "Sikh History",
            description: "Historical events and figures",
          },
          {
            name: "Gurmat Studies",
            description: "Sikh way of life and teachings",
          },
        ],
      },
      {
        age: "Ages 15 and up",
        courses: [
          {
            name: "Sikh Theology – ST 101",
            description: "Gurbani beginning level",
          },
          { name: "Sikh History – SH 202", description: "Intermediate level" },
          { name: "Gurmat Sangeet – GS 101", description: "Beginning level" },
        ],
      },
    ],
  },
  {
    department: "Computer Education",
    ageGroups: [
      {
        age: "Ages 12 and up",
        courses: [
          { name: "CE 101", description: "Introduction to Computers" },
          { name: "CE 102", description: "Computer Applications" },
        ],
      },
    ],
  },
  {
    department: "English Department",
    ageGroups: [
      {
        age: "All Ages",
        courses: [
          { name: "ESL 101", description: "Beginners Level" },
          { name: "ESL 102", description: "Intermediate levels" },
        ],
      },
      {
        age: "High School Students",
        courses: [{ name: "SAT 101", description: "Preparation for SAT" }],
      },
    ],
  },
];
