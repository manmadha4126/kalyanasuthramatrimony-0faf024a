import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check, Upload, Star, Heart, X, FileText } from "lucide-react";
import BackButton from "@/components/BackButton";
import logo from "@/assets/kalyanasuthra-logo.png";

const TOTAL_STEPS = 6;
const THEME = {
  primary: "210, 55%, 45%",
  primaryDeep: "210, 60%, 35%",
  primaryLight: "210, 40%, 94%",
  accent: "168, 45%, 45%",
  accentLight: "168, 35%, 93%",
  warm: "35, 55%, 95%",
};

const profileForOptions = ["Self", "Son", "Daughter", "Brother", "Sister", "Friend", "Relative"];
const genderOptions = ["Male", "Female"];
const motherTongueOptions = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "English", "Marathi", "Bengali", "Gujarati", "Punjabi", "Urdu", "Odia", "Assamese", "Konkani", "Sindhi", "Sanskrit", "Other"];
const heightOptions = Array.from({ length: 26 }, (_, i) => {
  const totalInches = 54 + i;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
});
const maritalStatusOptions = ["Never Married", "Divorced", "Widowed", "Separated"];

// All religions in India
const religionOptions = [
  "Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist",
  "Parsi / Zoroastrian", "Jewish", "Bahai", "No Religion", "Spiritual", "Other"
];

// Caste mapping based on religion
const casteMappings: Record<string, string[]> = {
  "Hindu": [
    "Brahmin", "Kshatriya", "Vaishya", "Shudra", "Agarwal", "Arora", "Bania", "Chettiar",
    "Devanga", "Ezhava", "Goud", "Gounder", "Iyer", "Iyengar", "Jat", "Kamma", "Kapu",
    "Kayastha", "Khandayat", "Khatri", "Kongu Vellalar", "Kurmi", "Lingayat", "Maratha",
    "Meena", "Mudaliar", "Nadar", "Naidu", "Nair", "Padmashali", "Patel", "Pillai",
    "Rajput", "Reddy", "Saini", "Sengunthar", "Thevar", "Vanniyar", "Velama", "Vishwakarma",
    "Vokkaliga", "Yadav", "SC / ST", "OBC", "Other", "No Caste Preference"
  ],
  "Muslim": [
    "Ansari", "Hanafi", "Jat Muslim", "Khoja", "Lebbai", "Malik", "Mappila", "Memon",
    "Mughal", "Pathan", "Qureshi", "Rajput Muslim", "Rowther", "Sayyid", "Shafi",
    "Sheikh", "Siddiqui", "Sunni", "Shia", "Other", "No Caste Preference"
  ],
  "Christian": [
    "Anglo-Indian", "Born Again", "Catholic", "CNI", "CSI", "Jacobite", "Knanaya",
    "Latin Catholic", "Marthoma", "Nadar Christian", "Orthodox", "Pentecostal",
    "Protestant", "Roman Catholic", "Syrian Catholic", "Syrian Orthodox", "Other", "No Caste Preference"
  ],
  "Sikh": [
    "Arora", "Bhatia", "Ghumar", "Jat Sikh", "Kamboj", "Khatri", "Labana",
    "Mazhabi", "Ramgarhia", "Ravidasia", "Saini", "Other", "No Caste Preference"
  ],
  "Jain": [
    "Agarwal", "Digamber", "Jaiswal", "KVO", "Oswal", "Porwal",
    "Shwetamber", "Visa Oswal", "Other", "No Caste Preference"
  ],
  "Buddhist": [
    "Mahar", "Neo-Buddhist", "Theravada", "Mahayana", "Vajrayana",
    "Other", "No Caste Preference"
  ],
  "Parsi / Zoroastrian": ["Irani", "Parsi", "Other", "No Caste Preference"],
  "Jewish": ["Bene Israel", "Cochin Jews", "Baghdadi", "Other", "No Caste Preference"],
  "Bahai": ["Bahai", "Other"],
  "No Religion": ["Not Applicable"],
  "Spiritual": ["Not Applicable"],
  "Other": ["Other", "No Caste Preference"]
};

const countryOptions = ["India", "USA", "UK", "Canada", "Australia", "UAE", "Singapore", "Germany", "New Zealand", "Malaysia", "South Africa", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Japan", "South Korea", "France", "Italy", "Netherlands", "Sweden", "Switzerland", "Ireland", "Other"];
const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
const educationOptions = ["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Degree (CA/CS/ICWA)", "Other"];

// Graduation details - degrees from India, USA, and other countries
const graduationDetailsOptions = [
  // Indian Degrees
  "B.Tech / B.E. (Engineering)", "B.Sc (Science)", "B.Com (Commerce)", "B.A. (Arts)", "B.B.A (Business Admin)",
  "B.C.A (Computer Applications)", "B.Arch (Architecture)", "B.Des (Design)", "B.Ed (Education)",
  "B.Pharm (Pharmacy)", "B.L / LLB (Law)", "MBBS (Medicine)", "BDS (Dental)", "BAMS (Ayurveda)",
  "BHMS (Homeopathy)", "BUMS (Unani Medicine)", "B.V.Sc (Veterinary)", "B.F.Sc (Fisheries)",
  "BHM (Hotel Management)", "BMS (Management Studies)",
  "M.Tech / M.E.", "M.Sc", "M.Com", "M.A.", "MBA", "MCA", "M.Ed", "M.Pharm",
  "M.L / LLM", "MD (Medicine)", "MS (Surgery)", "M.Des", "M.Arch",
  "CA (Chartered Accountant)", "CS (Company Secretary)", "ICWA / CMA",
  // USA / International Degrees  
  "B.S. (Bachelor of Science - US)", "B.A. (Bachelor of Arts - US)", "BBA (US)",
  "BSN (Nursing - US)", "B.F.A. (Fine Arts)", 
  "M.S. (Master of Science - US)", "M.A. (Master of Arts - US)", "MBA (US)",
  "MPH (Public Health)", "MSW (Social Work)", "MFA (Fine Arts)",
  "J.D. (Juris Doctor - Law)", "M.D. (Doctor of Medicine - US)", "D.O. (Osteopathic Medicine)",
  "Pharm.D (Doctor of Pharmacy)", "DDS / DMD (Dentistry - US)",
  "Ph.D", "Post Doctoral",
  // Other
  "Diploma / ITI", "Trade Certificate", "Other Degree"
];

const employmentOptions = ["Private Sector", "Government", "Self Employed / Business", "Public Sector", "Defence", "Civil Services (IAS/IPS/IFS)", "Not Working", "Student", "Freelancer", "Other"];

const board10Options = ["CBSE", "ICSE", "State Board - Andhra Pradesh", "State Board - Telangana", "State Board - Tamil Nadu", "State Board - Karnataka", "State Board - Kerala", "State Board - Maharashtra", "State Board - West Bengal", "State Board - Uttar Pradesh", "State Board - Bihar", "State Board - Rajasthan", "State Board - Gujarat", "State Board - Madhya Pradesh", "State Board - Odisha", "State Board - Punjab", "State Board - Haryana", "State Board - Jharkhand", "State Board - Chhattisgarh", "State Board - Assam", "State Board - Goa", "NIOS", "International Baccalaureate (IB)", "Cambridge (IGCSE)", "Other"];

const board12Options = ["CBSE", "ICSE / ISC", "State Board - Andhra Pradesh (BIE)", "State Board - Telangana (BIE)", "State Board - Tamil Nadu (HSC)", "State Board - Karnataka (PUC)", "State Board - Kerala (DHSE)", "State Board - Maharashtra (HSC)", "State Board - West Bengal (WBCHSE)", "State Board - Uttar Pradesh (UP Board)", "State Board - Bihar (BSEB)", "State Board - Rajasthan (RBSE)", "State Board - Gujarat (GSEB)", "State Board - Madhya Pradesh (MPBSE)", "State Board - Odisha (CHSE)", "State Board - Punjab (PSEB)", "State Board - Haryana (BSEH)", "State Board - Jharkhand (JAC)", "State Board - Chhattisgarh (CGBSE)", "State Board - Assam (AHSEC)", "State Board - Goa (GBSHSE)", "NIOS", "International Baccalaureate (IB)", "Cambridge (A-Levels)", "Other"];

const currencyOptions = ["INR (₹)", "USD ($)", "GBP (£)", "EUR (€)", "CAD (C$)", "AUD (A$)", "AED (د.إ)", "SGD (S$)", "MYR (RM)", "SAR (﷼)", "QAR (﷼)", "KWD (د.ك)", "BHD (BD)", "OMR (﷼)", "NZD (NZ$)", "JPY (¥)", "KRW (₩)", "CHF (CHF)", "ZAR (R)", "Other"];

const incomeByCountry: Record<string, string[]> = {
  "INR (₹)": ["Below ₹1 Lakh", "₹1-2 Lakhs", "₹2-3 Lakhs", "₹3-5 Lakhs", "₹5-7 Lakhs", "₹7-10 Lakhs", "₹10-15 Lakhs", "₹15-20 Lakhs", "₹20-30 Lakhs", "₹30-50 Lakhs", "₹50-75 Lakhs", "₹75 Lakhs-1 Crore", "₹1 Crore+"],
  "USD ($)": ["Below $10,000", "$10,000-$20,000", "$20,000-$30,000", "$30,000-$40,000", "$40,000-$50,000", "$50,000-$60,000", "$60,000-$70,000", "$70,000-$80,000", "$80,000-$90,000", "$90,000-$100,000", "$100,000-$150,000", "$150,000-$200,000", "$200,000+"],
  "GBP (£)": ["Below £10,000", "£10,000-£20,000", "£20,000-£30,000", "£30,000-£40,000", "£40,000-£50,000", "£50,000-£60,000", "£60,000-£70,000", "£70,000-£80,000", "£80,000-£100,000", "£100,000+"],
  "EUR (€)": ["Below €10,000", "€10,000-€20,000", "€20,000-€30,000", "€30,000-€40,000", "€40,000-€50,000", "€50,000-€60,000", "€60,000-€70,000", "€70,000-€80,000", "€80,000-€100,000", "€100,000+"],
  "CAD (C$)": ["Below C$15,000", "C$15,000-C$30,000", "C$30,000-C$45,000", "C$45,000-C$60,000", "C$60,000-C$75,000", "C$75,000-C$90,000", "C$90,000-C$120,000", "C$120,000-C$150,000", "C$150,000+"],
  "AUD (A$)": ["Below A$15,000", "A$15,000-A$30,000", "A$30,000-A$45,000", "A$45,000-A$60,000", "A$60,000-A$75,000", "A$75,000-A$90,000", "A$90,000-A$120,000", "A$120,000-A$150,000", "A$150,000+"],
  "AED (د.إ)": ["Below 50,000 AED", "50,000-100,000 AED", "100,000-150,000 AED", "150,000-200,000 AED", "200,000-300,000 AED", "300,000-500,000 AED", "500,000+ AED"],
  "SGD (S$)": ["Below S$20,000", "S$20,000-S$40,000", "S$40,000-S$60,000", "S$60,000-S$80,000", "S$80,000-S$100,000", "S$100,000-S$150,000", "S$150,000+"],
};

const citizenshipOptions = [
  "Indian Citizen", "NRI (Non-Resident Indian)", "PIO (Person of Indian Origin)",
  "OCI (Overseas Citizen of India)", "US Citizen", "UK Citizen", "Canadian Citizen",
  "Australian Citizen", "UAE Resident", "Singapore Citizen / PR", "German Citizen",
  "Dual Citizenship", "Foreign National", "Other"
];

const residenceOptions = [
  "Own House", "Rented House", "Rented Apartment", "Own Apartment / Flat",
  "With Family / Parents", "Company Provided", "PG / Hostel",
  "Co-Living", "Independent Villa", "Other"
];

const visaOptions = [
  "Not Applicable", "H1-B (Work Visa - US)", "H4 (Dependent Visa - US)",
  "L1 (Intra-Company Transfer)", "L2 (Dependent - US)", "F1 (Student Visa - US)",
  "OPT / CPT (US)", "Green Card / PR (US)", "US Citizen",
  "Tier 2 (Work Visa - UK)", "Tier 4 (Student - UK)", "ILR (UK PR)",
  "PR (Canada)", "Student Visa (Canada)", "Work Permit (Canada)",
  "PR (Australia)", "Subclass 482 (Australia Work)", "Student Visa (Australia)",
  "Employment Pass (Singapore)", "S Pass (Singapore)", "PR (Singapore)",
  "Work Visa (UAE)", "Residence Visa (UAE)", "Golden Visa (UAE)",
  "Work Visa (Germany)", "Blue Card (EU)", "Schengen Visa",
  "PR (New Zealand)", "Work Visa (Other Country)",
  "Student Visa (Other Country)", "Citizen (Other Country)", "Other"
];

const familyStatusOptions = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
const familyTypeOptions = ["Joint Family", "Nuclear Family", "Extended Family"];
const siblingsOptions = ["No Siblings", "1 Brother", "2 Brothers", "3+ Brothers", "1 Sister", "2 Sisters", "3+ Sisters", "1 Brother 1 Sister", "Multiple Siblings"];
const gothramOptions = ["Kashyapa", "Bharadwaja", "Vasistha", "Atri", "Viswamitra", "Agastya", "Garga", "Jamadagni", "Shandilya", "Koundinya", "Dhananjaya", "Haritasa", "Other", "Not Applicable"];
const raashiOptions = ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"];
const starOptions = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
const doshamOptions = ["No Dosham", "Chevvai Dosham", "Rahu Dosham", "Kethu Dosham", "Shani Dosham", "Not Known"];
const languageOptions = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "Sanskrit", "English", "Other"];
const chartStyleOptions = ["South Indian", "North Indian", "East Indian", "Sri Lankan"];

const stepTitles = ["Basic Details", "Personal Details", "Family Details", "Horoscope", "Photo Upload", "Review & Submit"];

type FormData = {
  name: string; profileFor: string; gender: string; email: string; phone: string; password: string; confirmPassword: string;
  dob: string; motherTongue: string; height: string; maritalStatus: string; religion: string; caste: string; subCaste: string;
  country: string; state: string; city: string; village: string;
  edu10Board: string; edu10Percentage: string; edu10School: string;
  edu12Board: string; edu12Percentage: string; edu12College: string;
  education: string; graduationDetail: string;
  employmentType: string; occupation: string; companyName: string; currencyType: string; annualIncome: string; citizenship: string; residenceType: string; visaType: string;
  familyStatus: string; familyType: string; fatherName: string; fatherOccupation: string; motherName: string; motherOccupation: string; siblings: string; siblingDetails: string;
  gothram: string; raashi: string; star: string; dosham: string; timeOfBirth: string; countryOfBirth: string; stateOfBirth: string; birthPlace: string; language: string; chartStyle: string; horoscopeFile: File | null;
  photos: File[]; primaryPhotoIndex: number;
};

const defaultForm: FormData = {
  name: "", profileFor: "", gender: "", email: "", phone: "", password: "", confirmPassword: "",
  dob: "", motherTongue: "", height: "", maritalStatus: "", religion: "", caste: "", subCaste: "",
  country: "India", state: "", city: "", village: "",
  edu10Board: "", edu10Percentage: "", edu10School: "",
  edu12Board: "", edu12Percentage: "", edu12College: "",
  education: "", graduationDetail: "",
  employmentType: "", occupation: "", companyName: "", currencyType: "INR (₹)", annualIncome: "", citizenship: "Indian Citizen", residenceType: "", visaType: "Not Applicable",
  familyStatus: "", familyType: "", fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "", siblings: "", siblingDetails: "",
  gothram: "", raashi: "", star: "", dosham: "", timeOfBirth: "", countryOfBirth: "India", stateOfBirth: "", birthPlace: "", language: "", chartStyle: "South Indian", horoscopeFile: null,
  photos: [], primaryPhotoIndex: 0,
};

const SelectField = ({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>{label}{required && <span style={{ color: "hsl(0, 70%, 55%)" }} className="ml-1">*</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 bg-white" style={{ border: `1.5px solid hsl(${THEME.primaryLight})`, color: "#333", fontSize: "0.9rem" }}>
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TextField = ({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>{label}{required && <span style={{ color: "hsl(0, 70%, 55%)" }} className="ml-1">*</span>}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 bg-white placeholder-gray-400" style={{ border: `1.5px solid hsl(${THEME.primaryLight})`, color: "#333", fontSize: "0.9rem" }} />
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-3 border-b last:border-0" style={{ borderColor: `hsl(${THEME.primaryLight})` }}>
    <span className="text-base font-semibold" style={{ color: `hsl(${THEME.primaryDeep})` }}>{label}</span>
    <span className="text-base text-right max-w-[55%]" style={{ color: "#333" }}>{value || "—"}</span>
  </div>
);

const SummarySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 bg-white rounded-2xl shadow-sm p-5" style={{ border: `1px solid hsl(${THEME.primaryLight})` }}>
    <h4 className="text-lg font-extrabold mb-3 px-5 py-3 rounded-xl tracking-wide" style={{ 
      background: 'linear-gradient(135deg, hsl(348, 56%, 27%), hsl(348, 50%, 37%))', 
      color: '#fff',
      fontFamily: "'Noto Sans', sans-serif",
      letterSpacing: '0.5px',
    }}>{title}</h4>
    <div className="px-3">{children}</div>
  </div>
);

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const set = (field: keyof FormData, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  // Dynamic caste options based on religion
  const casteOptions = useMemo(() => {
    if (!form.religion) return ["Other", "No Caste Preference"];
    return casteMappings[form.religion] || ["Other", "No Caste Preference"];
  }, [form.religion]);

  // Reset caste when religion changes
  const handleReligionChange = (v: string) => {
    set("religion", v);
    set("caste", "");
    set("subCaste", "");
  };

  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.profileFor) e.profileFor = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Invalid email";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter valid 10-digit phone";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step < TOTAL_STEPS) setStep(s => s + 1);
  };

  const back = () => { if (step > 1) setStep(s => s - 1); };

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f => f.size <= 25 * 1024 * 1024);
    const combined = [...form.photos, ...valid].slice(0, 5);
    set("photos", combined);
  };

  const parseHeightCm = (h: string): number | null => {
    if (!h) return null;
    const match = h.match(/(\d+)'(\d+)/);
    if (!match) return null;
    const feet = parseInt(match[1]);
    const inches = parseInt(match[2]);
    return Math.round((feet * 12 + inches) * 2.54);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } }
      });
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("User ID not returned");

      let profilePhotoUrl: string | null = null;
      if (form.photos.length > 0) {
        const primary = form.photos[form.primaryPhotoIndex];
        const ext = primary.name.split(".").pop();
        const path = `${userId}/profile.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("profile-photos").upload(path, primary, { upsert: true });
        if (!uploadErr) {
          const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
          profilePhotoUrl = urlData.publicUrl;
        }
      }

      const heightCm = parseHeightCm(form.height);

      const { error: profileErr } = await supabase.rpc("create_profile_on_register", {
        p_user_id: userId,
        p_full_name: form.name,
        p_gender: form.gender,
        p_email: form.email,
        p_phone: form.phone,
        p_profile_created_by: form.profileFor,
        p_date_of_birth: form.dob || null,
        p_mother_tongue: form.motherTongue || null,
        p_height_cm: heightCm,
        p_marital_status: form.maritalStatus || "Never Married",
        p_religion: form.religion || "Hindu",
        p_caste: form.caste || null,
        p_sub_caste: form.subCaste || null,
        p_country: form.country || "India",
        p_state: form.state || null,
        p_city: form.city || null,
        p_native_place: form.village || null,
        p_education: form.education || null,
        p_occupation: form.occupation || null,
        p_company_name: form.companyName || null,
        p_annual_income: form.annualIncome || null,
        p_family_status: form.familyStatus || null,
        p_family_type: form.familyType || null,
        p_father_name: form.fatherName || null,
        p_father_occupation: form.fatherOccupation || null,
        p_mother_name: form.motherName || null,
        p_mother_occupation: form.motherOccupation || null,
        p_siblings: form.siblings || null,
        p_gothra: form.gothram || null,
        p_raasi: form.raashi || null,
        p_star: form.star || null,
        p_dosham: form.dosham || null,
        p_whatsapp: form.phone || null,
        p_profile_photo_url: profilePhotoUrl,
        p_education_detail: [form.edu10Board && `10th: ${form.edu10Board} - ${form.edu10Percentage}% - ${form.edu10School}`, form.edu12Board && `12th: ${form.edu12Board} - ${form.edu12Percentage}% - ${form.edu12College}`, form.graduationDetail && `Degree: ${form.graduationDetail}`].filter(Boolean).join(", ") || null,
      });

      if (profileErr) throw profileErr;

      setDone(true);
      toast({ title: "Registration successful!", description: "Your profile has been submitted for review." });
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({ title: "Error", description: err.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: `linear-gradient(135deg, hsl(${THEME.warm}), hsl(${THEME.primaryLight}), hsl(${THEME.accentLight}))` }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-2" style={{ background: `linear-gradient(90deg, hsl(${THEME.accent}), hsl(${THEME.primary}))` }} />
            <div className="p-8 sm:p-10 text-center">
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: `hsl(${THEME.accentLight})`, border: `3px solid hsl(${THEME.accent})` }}
              >
                <Check className="w-10 h-10" style={{ color: `hsl(${THEME.accent})` }} />
              </motion.div>

              <h2 className="text-2xl font-bold mb-4" style={{ color: `hsl(${THEME.primaryDeep})`, fontFamily: "system-ui, sans-serif" }}>Profile Created Successfully!</h2>

              <div className="rounded-xl p-5 mb-5 text-left" style={{ background: `hsl(${THEME.accentLight})`, border: `1px solid hsl(${THEME.accent} / 0.3)` }}>
                <p className="text-sm leading-relaxed" style={{ color: `hsl(${THEME.primaryDeep})` }}>
                  Your profile has been created successfully. Our assistance team will verify your profile and approve it shortly. You will be notified once your profile is verified and activated.
                </p>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{ background: `hsl(${THEME.primaryLight})`, border: `1px solid hsl(${THEME.primary} / 0.2)` }}>
                <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                  Thank you for registering with <strong style={{ color: `hsl(${THEME.primaryDeep})` }}>Kalyanasuthra Matrimony</strong>. We are committed to ensuring authentic and trusted profiles for a safe matrimonial experience.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "hsl(38, 90%, 95%)", border: "1px solid hsl(38, 80%, 85%)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(38, 90%, 50%)" }} />
                <span className="text-xs font-semibold" style={{ color: "hsl(38, 70%, 35%)" }}>Status: Pending Verification</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate("/")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border text-gray-600 hover:bg-gray-50 transition-colors" style={{ borderColor: `hsl(${THEME.primaryLight})` }}>
                  Back to Home
                </button>
                <button onClick={() => navigate("/login")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: `hsl(${THEME.primary})` }}>
                  Login to Dashboard
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4 relative overflow-hidden" style={{ background: `linear-gradient(160deg, hsl(${THEME.warm}) 0%, hsl(${THEME.primaryLight}) 40%, hsl(${THEME.accentLight}) 70%, hsl(${THEME.warm}) 100%)` }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: `hsl(${THEME.primary})` }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: `hsl(${THEME.accent})` }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-[0.04]" style={{ background: `hsl(${THEME.primary})` }} />
        {/* Floating hearts */}
        <Heart className="absolute top-20 right-20 opacity-[0.06]" size={40} style={{ color: `hsl(${THEME.primary})` }} />
        <Heart className="absolute bottom-40 left-20 opacity-[0.05]" size={30} style={{ color: `hsl(${THEME.accent})` }} />
        <Heart className="absolute top-1/2 right-10 opacity-[0.04]" size={25} style={{ color: `hsl(${THEME.primary})` }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back + Logo */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <BackButton to="/" label="Home" />
          <a href="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-14 w-auto object-contain" />
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ boxShadow: `0 20px 60px hsl(${THEME.primary} / 0.1)` }}>
          <div className="h-1.5 bg-gray-100 relative">
            <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{ background: `linear-gradient(90deg, hsl(${THEME.primary}), hsl(${THEME.accent}))` }} animate={{ width: `${progress + (100 / TOTAL_STEPS)}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-0 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[320px]">
              {stepTitles.map((title, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all" style={
                    i + 1 < step ? { background: `hsl(${THEME.accent})`, color: "white" }
                    : i + 1 === step ? { background: `hsl(${THEME.primary})`, color: "white", boxShadow: `0 0 0 3px hsl(${THEME.primary} / 0.2)` }
                    : { background: "#f0f0f0", color: "#aaa" }
                  }>
                    {i + 1 < step ? <Check size={12} /> : i + 1}
                  </div>
                  <span className="text-[9px] sm:text-[10px] whitespace-nowrap font-medium" style={{ color: i + 1 === step ? `hsl(${THEME.primary})` : "#aaa" }}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-8 py-5 sm:py-7">
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: `hsl(${THEME.primaryDeep})`, fontFamily: "system-ui, sans-serif" }}>
              Step {step}: {stepTitles[step - 1]}
            </h2>
            <p className="text-sm mb-5 sm:mb-7" style={{ color: "#999" }}>Fill in accurate details for the best matches</p>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>

                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <TextField label="Full Name" value={form.name} onChange={v => set("name", v)} required />
                      {errors.name && <p className="text-xs mt-1" style={{ color: "hsl(0, 70%, 55%)" }}>{errors.name}</p>}
                    </div>
                    <SelectField label="Profile For" value={form.profileFor} onChange={v => set("profileFor", v)} options={profileForOptions} required />
                    <SelectField label="Gender" value={form.gender} onChange={v => set("gender", v)} options={genderOptions} required />
                    <div className="sm:col-span-2">
                      <TextField label="Email" value={form.email} onChange={v => set("email", v)} type="email" required />
                      {errors.email && <p className="text-xs mt-1" style={{ color: "hsl(0, 70%, 55%)" }}>{errors.email}</p>}
                    </div>
                    <div>
                      <TextField label="Phone Number" value={form.phone} onChange={v => set("phone", v)} type="tel" required />
                      {errors.phone && <p className="text-xs mt-1" style={{ color: "hsl(0, 70%, 55%)" }}>{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2 relative">
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>Password <span style={{ color: "hsl(0, 70%, 55%)" }}>*</span></label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min. 8 characters" className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 pr-10" style={{ border: `1.5px solid hsl(${THEME.primaryLight})`, fontSize: "0.9rem" }} />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                      </div>
                      {errors.password && <p className="text-xs mt-1" style={{ color: "hsl(0, 70%, 55%)" }}>{errors.password}</p>}
                    </div>
                    <div className="sm:col-span-2 relative">
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>Confirm Password <span style={{ color: "hsl(0, 70%, 55%)" }}>*</span></label>
                      <div className="relative">
                        <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)} placeholder="Re-enter password" className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 pr-10" style={{ border: `1.5px solid hsl(${THEME.primaryLight})`, fontSize: "0.9rem" }} />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                      </div>
                      {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "hsl(0, 70%, 55%)" }}>{errors.confirmPassword}</p>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>Date of Birth</label>
                      <input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2" style={{ border: `1.5px solid hsl(${THEME.primaryLight})`, fontSize: "0.9rem" }} />
                    </div>
                    <SelectField label="Mother Tongue" value={form.motherTongue} onChange={v => set("motherTongue", v)} options={motherTongueOptions} />
                    <SelectField label="Height" value={form.height} onChange={v => set("height", v)} options={heightOptions} />
                    <SelectField label="Marital Status" value={form.maritalStatus} onChange={v => set("maritalStatus", v)} options={maritalStatusOptions} />
                    <SelectField label="Religion" value={form.religion} onChange={handleReligionChange} options={religionOptions} />
                    <SelectField label="Caste" value={form.caste} onChange={v => set("caste", v)} options={casteOptions} />
                    <TextField label="Sub Caste" value={form.subCaste} onChange={v => set("subCaste", v)} />
                    <SelectField label="Country" value={form.country} onChange={v => set("country", v)} options={countryOptions} />
                    <SelectField label="State" value={form.state} onChange={v => set("state", v)} options={indianStates} />
                    <TextField label="City" value={form.city} onChange={v => set("city", v)} />
                    <TextField label="Village / Native Place" value={form.village} onChange={v => set("village", v)} />
                    
                    {/* 10th Education */}
                    <div className="sm:col-span-2"><p className="text-sm font-bold mt-2" style={{ color: `hsl(${THEME.primary})` }}>10th Standard Details</p></div>
                    <SelectField label="10th Board" value={form.edu10Board} onChange={v => set("edu10Board", v)} options={board10Options} />
                    <TextField label="10th Percentage (%)" value={form.edu10Percentage} onChange={v => set("edu10Percentage", v)} placeholder="e.g. 85" />
                    <div className="sm:col-span-2">
                      <TextField label="10th School Name" value={form.edu10School} onChange={v => set("edu10School", v)} placeholder="Enter school name" />
                    </div>

                    {/* 12th Education */}
                    <div className="sm:col-span-2"><p className="text-sm font-bold mt-2" style={{ color: `hsl(${THEME.primary})` }}>12th / Intermediate Details</p></div>
                    <SelectField label="12th Board" value={form.edu12Board} onChange={v => set("edu12Board", v)} options={board12Options} />
                    <TextField label="12th Percentage (%)" value={form.edu12Percentage} onChange={v => set("edu12Percentage", v)} placeholder="e.g. 90" />
                    <div className="sm:col-span-2">
                      <TextField label="12th College Name" value={form.edu12College} onChange={v => set("edu12College", v)} placeholder="Enter college name" />
                    </div>

                    <SelectField label="Education / Graduation" value={form.education} onChange={v => set("education", v)} options={educationOptions} />
                    {(form.education === "Bachelor's Degree" || form.education === "Master's Degree" || form.education === "PhD" || form.education === "Professional Degree (CA/CS/ICWA)") && (
                      <SelectField label="Graduation Details" value={form.graduationDetail} onChange={v => set("graduationDetail", v)} options={graduationDetailsOptions} />
                    )}
                    <SelectField label="Employment Type" value={form.employmentType} onChange={v => set("employmentType", v)} options={employmentOptions} />
                    <TextField label="Occupation" value={form.occupation} onChange={v => set("occupation", v)} />
                    <TextField label="Company Name" value={form.companyName} onChange={v => set("companyName", v)} />
                    <SelectField label="Currency Type" value={form.currencyType} onChange={v => { set("currencyType", v); set("annualIncome", ""); }} options={currencyOptions} />
                    <SelectField label="Annual Income" value={form.annualIncome} onChange={v => set("annualIncome", v)} options={incomeByCountry[form.currencyType] || ["Enter manually"]} />
                    <SelectField label="Citizenship" value={form.citizenship} onChange={v => set("citizenship", v)} options={citizenshipOptions} />
                    <SelectField label="Residence Type" value={form.residenceType} onChange={v => set("residenceType", v)} options={residenceOptions} />
                    <SelectField label="Visa Type" value={form.visaType} onChange={v => set("visaType", v)} options={visaOptions} />
                    <SelectField label="Visa Type" value={form.visaType} onChange={v => set("visaType", v)} options={visaOptions} />
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectField label="Family Status" value={form.familyStatus} onChange={v => set("familyStatus", v)} options={familyStatusOptions} />
                    <SelectField label="Family Type" value={form.familyType} onChange={v => set("familyType", v)} options={familyTypeOptions} />
                    <TextField label="Father's Name" value={form.fatherName} onChange={v => set("fatherName", v)} />
                    <TextField label="Father's Occupation" value={form.fatherOccupation} onChange={v => set("fatherOccupation", v)} />
                    <TextField label="Mother's Name" value={form.motherName} onChange={v => set("motherName", v)} />
                    <TextField label="Mother's Occupation" value={form.motherOccupation} onChange={v => set("motherOccupation", v)} />
                    <SelectField label="Siblings" value={form.siblings} onChange={v => set("siblings", v)} options={siblingsOptions} />
                    <TextField label="Sibling Details" value={form.siblingDetails} onChange={v => set("siblingDetails", v)} placeholder="e.g. 1 brother (married)" />
                  </div>
                )}

                {step === 4 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectField label="Gothram" value={form.gothram} onChange={v => set("gothram", v)} options={gothramOptions} />
                    <SelectField label="Rashi (Zodiac Sign)" value={form.raashi} onChange={v => set("raashi", v)} options={raashiOptions} />
                    <SelectField label="Star (Nakshatram)" value={form.star} onChange={v => set("star", v)} options={starOptions} />
                    <SelectField label="Dosham" value={form.dosham} onChange={v => set("dosham", v)} options={doshamOptions} />
                    <TextField label="Time of Birth (HH:MM:SS)" value={form.timeOfBirth} onChange={v => set("timeOfBirth", v)} placeholder="08:30:00" />
                    <SelectField label="Country of Birth" value={form.countryOfBirth} onChange={v => set("countryOfBirth", v)} options={countryOptions} />
                    <SelectField label="State of Birth" value={form.stateOfBirth} onChange={v => set("stateOfBirth", v)} options={indianStates} />
                    <TextField label="Birth Place" value={form.birthPlace} onChange={v => set("birthPlace", v)} />
                    <SelectField label="Language" value={form.language} onChange={v => set("language", v)} options={languageOptions} />
                    <SelectField label="Chart Style" value={form.chartStyle} onChange={v => set("chartStyle", v)} options={chartStyleOptions} />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: `hsl(${THEME.primaryDeep})` }}>Upload Horoscope (PDF/Image)</label>
                      <label className="flex items-center gap-3 border-2 border-dashed rounded-lg p-5 cursor-pointer transition-colors hover:bg-gray-50" style={{ borderColor: `hsl(${THEME.primaryLight})` }}>
                        <Upload size={20} style={{ color: `hsl(${THEME.primary})` }} />
                        <span className="text-sm" style={{ color: "#666" }}>{form.horoscopeFile ? "Upload a different file" : "Click to upload horoscope file"}</span>
                        <input type="file" className="hidden" accept="*/*" onChange={e => set("horoscopeFile", e.target.files?.[0] || null)} />
                      </label>
                      {form.horoscopeFile && (
                        <div className="mt-3 flex items-center gap-3 rounded-lg p-3" style={{ background: `hsl(${THEME.accentLight})`, border: `1px solid hsl(${THEME.accent} / 0.3)` }}>
                          <FileText size={20} style={{ color: `hsl(${THEME.accent})` }} />
                          <span className="text-sm font-medium flex-1 truncate" style={{ color: `hsl(${THEME.primaryDeep})` }}>{form.horoscopeFile.name}</span>
                          <button type="button" onClick={() => set("horoscopeFile", null)} className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold text-white transition-colors hover:opacity-80" style={{ background: "hsl(0, 60%, 55%)" }}>
                            <X size={12} /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: `hsl(${THEME.primaryDeep})` }}>Upload Photos (Max 5, each below 25MB)</label>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 sm:p-10 cursor-pointer transition-colors" style={{ borderColor: `hsl(${THEME.primaryLight})` }}>
                        <Upload size={32} style={{ color: `hsl(${THEME.primary})` }} className="mb-3" />
                        <span className="text-base font-medium" style={{ color: `hsl(${THEME.primaryDeep})` }}>Click to upload photos</span>
                        <span className="text-sm mt-1" style={{ color: "#999" }}>{form.photos.length}/5 uploaded</span>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={e => handlePhotoUpload(e.target.files)} />
                      </label>
                    </div>
                    {form.photos.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-3" style={{ color: `hsl(${THEME.primaryDeep})` }}>Select Primary Photo <Star size={14} className="inline" style={{ color: `hsl(${THEME.accent})` }} /></p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {form.photos.map((photo, i) => (
                            <div key={i} className="relative cursor-pointer rounded-xl overflow-hidden" style={{ border: i === form.primaryPhotoIndex ? `3px solid hsl(${THEME.primary})` : "2px solid #eee" }} onClick={() => set("primaryPhotoIndex", i)}>
                              <img src={URL.createObjectURL(photo)} alt="" className="w-full aspect-[3/4] object-cover" />
                              {i === form.primaryPhotoIndex && (
                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: `hsl(${THEME.primary} / 0.3)` }}>
                                  <Star size={28} className="text-white fill-white" />
                                </div>
                              )}
                              <button onClick={e => { e.stopPropagation(); const p = form.photos.filter((_, j) => j !== i); set("photos", p); if (form.primaryPhotoIndex >= p.length) set("primaryPhotoIndex", 0); }} className="absolute -top-1 -right-1 w-6 h-6 text-white rounded-full text-xs flex items-center justify-center" style={{ background: "hsl(0, 60%, 55%)" }}>×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 6 && (
                  <motion.div 
                    className="space-y-5 max-h-[70vh] overflow-y-auto pr-1"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-1" style={{ color: `hsl(${THEME.primaryDeep})`, fontFamily: "system-ui, sans-serif" }}>Review Your Profile Details</h3>
                      <p className="text-base" style={{ color: "#888" }}>Please verify all information before submitting</p>
                    </div>

                    {/* Photo preview at top */}
                    {form.photos.length > 0 && (
                      <motion.div className="mb-6" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-lg font-bold mb-4 px-5 py-3 rounded-xl" style={{ background: `hsl(${THEME.primaryLight})`, color: `hsl(${THEME.primaryDeep})` }}>📷 Your Photo</h4>
                        <div className="flex justify-center">
                          <div className="w-52 sm:w-60 rounded-2xl overflow-hidden shadow-xl" style={{ border: `3px solid hsl(${THEME.primary})` }}>
                            <img src={URL.createObjectURL(form.photos[form.primaryPhotoIndex])} alt="Profile" className="w-full aspect-[3/4] object-cover" />
                          </div>
                        </div>
                        {form.photos.length > 1 && (
                          <div className="flex justify-center gap-3 mt-4">
                            {form.photos.map((photo, i) => (
                              <img key={i} src={URL.createObjectURL(photo)} alt="" className="w-14 h-14 rounded-xl object-cover" style={{ border: i === form.primaryPhotoIndex ? `2px solid hsl(${THEME.primary})` : "1px solid #ddd", opacity: i === form.primaryPhotoIndex ? 1 : 0.6 }} />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    <SummarySection title="📋 Basic Information">
                      <SummaryRow label="Full Name" value={form.name} />
                      <SummaryRow label="Profile Created For" value={form.profileFor} />
                      <SummaryRow label="Gender" value={form.gender} />
                      <SummaryRow label="Email" value={form.email} />
                      <SummaryRow label="Phone" value={form.phone} />
                    </SummarySection>
                    <SummarySection title="👤 Personal Details">
                      <SummaryRow label="Date of Birth" value={form.dob} />
                      <SummaryRow label="Mother Tongue" value={form.motherTongue} />
                      <SummaryRow label="Height" value={form.height} />
                      <SummaryRow label="Marital Status" value={form.maritalStatus} />
                      <SummaryRow label="Religion" value={form.religion} />
                      <SummaryRow label="Caste" value={form.caste} />
                      <SummaryRow label="Sub Caste" value={form.subCaste} />
                      <SummaryRow label="Country" value={form.country} />
                      <SummaryRow label="State" value={form.state} />
                      <SummaryRow label="City" value={form.city} />
                      <SummaryRow label="Village / Native" value={form.village} />
                    </SummarySection>
                    <SummarySection title="🎓 Education & Career">
                      <SummaryRow label="10th Education" value={form.edu10} />
                      <SummaryRow label="12th Education" value={form.edu12} />
                      <SummaryRow label="Education" value={form.education} />
                      <SummaryRow label="Graduation Details" value={form.graduationDetail} />
                      <SummaryRow label="Employment Type" value={form.employmentType} />
                      <SummaryRow label="Occupation" value={form.occupation} />
                      <SummaryRow label="Company Name" value={form.companyName} />
                      <SummaryRow label="Annual Income" value={form.annualIncome} />
                      <SummaryRow label="Citizenship" value={form.citizenship} />
                      <SummaryRow label="Residence Type" value={form.residenceType} />
                      <SummaryRow label="Visa Type" value={form.visaType} />
                    </SummarySection>
                    <SummarySection title="👨‍👩‍👧‍👦 Family Details">
                      <SummaryRow label="Family Status" value={form.familyStatus} />
                      <SummaryRow label="Family Type" value={form.familyType} />
                      <SummaryRow label="Father's Name" value={form.fatherName} />
                      <SummaryRow label="Father's Occupation" value={form.fatherOccupation} />
                      <SummaryRow label="Mother's Name" value={form.motherName} />
                      <SummaryRow label="Mother's Occupation" value={form.motherOccupation} />
                      <SummaryRow label="Siblings" value={form.siblings} />
                      <SummaryRow label="Sibling Details" value={form.siblingDetails} />
                    </SummarySection>
                    <SummarySection title="🔮 Horoscope Details">
                      <SummaryRow label="Gothram" value={form.gothram} />
                      <SummaryRow label="Rashi" value={form.raashi} />
                      <SummaryRow label="Star" value={form.star} />
                      <SummaryRow label="Dosham" value={form.dosham} />
                      <SummaryRow label="Time of Birth" value={form.timeOfBirth} />
                      <SummaryRow label="Country of Birth" value={form.countryOfBirth} />
                      <SummaryRow label="State of Birth" value={form.stateOfBirth} />
                      <SummaryRow label="Birth Place" value={form.birthPlace} />
                      <SummaryRow label="Language" value={form.language} />
                      <SummaryRow label="Chart Style" value={form.chartStyle} />
                      <SummaryRow label="Horoscope File" value={form.horoscopeFile?.name || "Not uploaded"} />
                    </SummarySection>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-7 sm:mt-9">
              {step > 1 && (
                <button onClick={back} className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg text-sm font-semibold border text-gray-600 hover:bg-gray-50 transition-colors" style={{ borderColor: `hsl(${THEME.primaryLight})` }}>
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button onClick={next} className="ml-auto flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg, hsl(${THEME.primary}), hsl(${THEME.accent}))` }}>
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSave} disabled={saving} className="ml-auto flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60" style={{ background: `linear-gradient(135deg, hsl(${THEME.primary}), hsl(${THEME.accent}))` }}>
                  {saving ? "Saving..." : "Submit Registration"} <Check size={16} />
                </button>
              )}
            </div>

            <p className="text-center text-sm mt-5" style={{ color: "#999" }}>
              Already registered? <a href="/login" className="font-semibold" style={{ color: `hsl(${THEME.primary})` }}>Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
