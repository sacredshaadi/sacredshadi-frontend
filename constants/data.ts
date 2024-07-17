import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];

export const fillerCities = [
  'Agartala',
  'Guwahati',
  'Kolkata',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Udaipur',
  'Patna',
  'Bhubaneswar',
  'Bangalore',
  'Mumbai',
  'Chennai',
  'Other'
];

export const phoneArr = ['+91 9869908415', '+91 7890835517'];

export const faq = {
  userfaq: [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the Sign Up button on the top right corner of the page. You will be asked to provide some basic information to create your account.'
    },
    {
      question: 'How do I reset my password?',
      answer:
        'To reset your password, click on the Forgot Password link on the Sign In page. You will be asked to provide your email address to receive a password reset link.'
    },
    {
      question: 'How do I update my profile information?',
      answer:
        'To update your profile information, go to your profile page and click on the Edit Profile button. You can then update your information and save the changes.'
    },
    {
      question: 'How do I delete my account?',
      answer:
        'To delete your account, go to your profile page and click on the Delete Account button. You will be asked to confirm the deletion of your account.'
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'To contact customer support, go to the Contact Us page and fill out the form with your query. Our support team will get back to you as soon as possible.'
    }
  ],
  vendorfaq: [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the Sign Up button on the top right corner of the page. You will be asked to provide some basic information to create your account.'
    },
    {
      question: 'How do I reset my password?',
      answer:
        'To reset your password, click on the Forgot Password link on the Sign In page. You will be asked to provide your email address to receive a password reset link.'
    },
    {
      question: 'How do I update my profile information?',
      answer:
        'To update your profile information, go to your profile page and click on the Edit Profile button. You can then update your information and save the changes.'
    },
    {
      question: 'How do I delete my account?',
      answer:
        'To delete your account, go to your profile page and click on the Delete Account button. You will be asked to confirm the deletion of your account.'
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'To contact customer support, go to the Contact Us page and fill out the form with your query. Our support team will get back to you as soon as possible.'
    }
  ]
};

export const sacredShaadiAddress =
  'SaltLake, Sector V, Bidhannagar, Kolkata, West Bengal 700091';

export const sacredShaadiTeam = [
  {
    id: 0,
    name: 'Anirban',
    role: 'CEO & Co-Founder',
    image: '/images/designer.jpg'
  },
  {
    id: 1,
    name: 'Chinmay',
    role: 'Co-Founder',
    image: '/images/ceo.jpg'
  },
  {
    id: 2,
    name: 'Gazi',
    role: 'Lead Planner & Relationship Manager',
    image: '/images/designer.jpg'
  },
  {
    id: 3,
    name: 'Snigdha',
    role: 'Lead Planner & Relationship Manager',
    image: '/images/developer.jpg'
  },
  {
    id: 4,
    name: 'Join Us',
    role: 'Send us a mail at sacredshaadi@gmail.com',
    image: '/images/manager.jpg'
  }
];
