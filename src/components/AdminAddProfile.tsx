import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check } from "lucide-react";

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
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi / Zoroastrian", "Jewish", "Bahai", "No Religion", "Spiritual", "Other"];
const casteMappings: Record<string, string[]> = {
  "Hindu": ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Agarwal", "Arora", "Bania", "Chettiar", "Devanga", "Ezhava", "Goud", "Gounder", "Iyer", "Iyengar", "Jat", "Kamma", "Kapu", "Kayastha", "Khandayat", "Khatri", "Kongu Vellalar", "Kurmi", "Lingayat", "Maratha", "Meena", "Mudaliar", "Nadar", "Naidu", "Nair", "Padmashali", "Patel", "Pillai", "Rajput", "Reddy", "Saini", "Sengunthar", "Thevar", "Vanniyar", "Velama", "Vishwakarma", "Vokkaliga", "Yadav", "SC / ST", "OBC", "Other", "No Caste Preference"],
  "Muslim": ["Ansari", "Hanafi", "Jat Muslim", "Khoja", "Lebbai", "Malik", "Mappila", "Memon", "Mughal", "Pathan", "Qureshi", "Rajput Muslim", "Rowther", "Sayyid", "Shafi", "Sheikh", "Siddiqui", "Sunni", "Shia", "Other", "No Caste Preference"],
  "Christian": ["Anglo-Indian", "Born Again", "Catholic", "CNI", "CSI", "Jacobite", "Knanaya", "Latin Catholic", "Marthoma", "Nadar Christian", "Orthodox", "Pentecostal", "Protestant", "Roman Catholic", "Syrian Catholic", "Syrian Orthodox", "Other", "No Caste Preference"],
  "Sikh": ["Arora", "Bhatia", "Ghumar", "Jat Sikh", "Kamboj", "Khatri", "Labana", "Mazhabi", "Ramgarhia", "Ravidasia", "Saini", "Other", "No Caste Preference"],
  "Jain": ["Agarwal", "Digamber", "Jaiswal", "KVO", "Oswal", "Porwal", "Shwetamber", "Visa Oswal", "Other", "No Caste Preference"],
  "Buddhist": ["Mahar", "Neo-Buddhist", "Theravada", "Mahayana", "Vajrayana", "Other", "No Caste Preference"],
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
const graduationDetailsOptions = ["B.Tech / B.E. (Engineering)", "B.Sc (Science)", "B.Com (Commerce)", "B.A. (Arts)", "B.B.A (Business Admin)", "B.C.A (Computer Applications)", "B.Arch (Architecture)", "B.Des (Design)", "B.Ed (Education)", "B.Pharm (Pharmacy)", "B.L / LLB (Law)", "MBBS (Medicine)", "BDS (Dental)", "BAMS (Ayurveda)", "BHMS (Homeopathy)", "M.Tech / M.E.", "M.Sc", "M.Com", "M.A.", "MBA", "MCA", "M.Ed", "M.Pharm", "M.L / LLM", "MD (Medicine)", "MS (Surgery)", "CA (Chartered Accountant)", "CS (Company Secretary)", "ICWA / CMA", "B.S. (Bachelor of Science - US)", "M.S. (Master of Science - US)", "MBA (US)", "Ph.D", "Post Doctoral", "Diploma / ITI", "Other Degree"];
const employmentOptions = ["Private Sector", "Government", "Self Employed / Business", "Public Sector", "Defence", "Civil Services (IAS/IPS/IFS)", "Not Working", "Student", "Freelancer", "Other"];
const board10Options = ["CBSE", "ICSE", "State Board - Tamil Nadu", "State Board - Andhra Pradesh", "State Board - Telangana", "State Board - Karnataka", "State Board - Kerala", "State Board - Maharashtra", "NIOS", "International Baccalaureate (IB)", "Other"];
const board12Options = ["CBSE", "ICSE / ISC", "State Board - Tamil Nadu (HSC)", "State Board - Andhra Pradesh (BIE)", "State Board - Telangana (BIE)", "State Board - Karnataka (PUC)", "State Board - Kerala (DHSE)", "State Board - Maharashtra (HSC)", "NIOS", "International Baccalaureate (IB)", "Other"];
const currencyOptions = ["INR (₹)", "USD ($)", "GBP (£)", "EUR (€)", "CAD (C$)", "AUD (A$)", "AED (د.إ)", "SGD (S$)", "Other"];
const incomeByCountry: Record<string, string[]> = {
  "INR (₹)": ["Below ₹1 Lakh", "₹1-2 Lakhs", "₹2-3 Lakhs", "₹3-5 Lakhs", "₹5-7 Lakhs", "₹7-10 Lakhs", "₹10-15 Lakhs", "₹15-20 Lakhs", "₹20-30 Lakhs", "₹30-50 Lakhs", "₹50-75 Lakhs", "₹75 Lakhs-1 Crore", "₹1 Crore+"],
  "USD ($)": ["Below $10,000", "$10,000-$20,000", "$20,000-$30,000", "$30,000-$50,000", "$50,000-$80,000", "$80,000-$100,000", "$100,000-$150,000", "$150,000-$200,000", "$200,000+"],
  "GBP (£)": ["Below £10,000", "£10,000-£20,000", "£20,000-£40,000", "£40,000-£60,000", "£60,000-£80,000", "£80,000-£100,000", "£100,000+"],
};
const citizenshipOptions = ["Indian Citizen", "NRI (Non-Resident Indian)", "PIO (Person of Indian Origin)", "OCI (Overseas Citizen of India)", "US Citizen", "UK Citizen", "Canadian Citizen", "Australian Citizen", "UAE Resident", "Singapore Citizen / PR", "German Citizen", "Dual Citizenship", "Foreign National", "Other"];
const residenceOptions = ["Own House", "Rented House", "Rented Apartment", "Own Apartment / Flat", "With Family / Parents", "Company Provided", "PG / Hostel", "Co-Living", "Independent Villa", "Other"];
const visaOptions = ["Not Applicable", "H1-B (Work Visa - US)", "H4 (Dependent Visa - US)", "L1 (Intra-Company Transfer)", "Green Card / PR (US)", "PR (Canada)", "PR (Australia)", "Employment Pass (Singapore)", "Work Visa (UAE)", "Golden Visa (UAE)", "Blue Card (EU)", "Other"];
const familyStatusOptions = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
const familyTypeOptions = ["Joint Family", "Nuclear Family", "Extended Family"];
const siblingsOptions = ["No Siblings", "1 Brother", "2 Brothers", "3+ Brothers", "1 Sister", "2 Sisters", "3+ Sisters", "1 Brother 1 Sister", "Multiple Siblings"];
const gothramOptions = ["Kashyapa", "Bharadwaja", "Vasistha", "Atri", "Viswamitra", "Agastya", "Garga", "Jamadagni", "Shandilya", "Koundinya", "Dhananjaya", "Haritasa", "Other", "Not Applicable"];
const raashiOptions = ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"];
const starOptions = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
const doshamOptions = ["No Dosham", "Chevvai Dosham", "Rahu Dosham", "Kethu Dosham", "Shani Dosham", "Not Known"];

type AdminForm = {
  name: string; profileFor: string; gender: string; email: string; phone: string;
  dob: string; motherTongue: string; height: string; maritalStatus: string; religion: string; caste: string; subCaste: string;
  country: string; state: string; city: string; village: string;
  edu10Board: string; edu10Percentage: string; edu10School: string;
  edu12Board: string; edu12Percentage: string; edu12College: string;
  education: string; graduationDetail: string;
  employmentType: string; occupation: string; companyName: string; currencyType: string; annualIncome: string; citizenship: string; residenceType: string; visaType: string;
  familyStatus: string; familyType: string; fatherName: string; fatherOccupation: string; motherName: string; motherOccupation: string; siblings: string; siblingDetails: string;
  gothram: string; raashi: string; star: string; dosham: string;
  aboutMe: string;
};

const defaultForm: AdminForm = {
  name: "", profileFor: "Self", gender: "", email: "", phone: "",
  dob: "", motherTongue: "", height: "", maritalStatus: "", religion: "", caste: "", subCaste: "",
  country: "India", state: "", city: "", village: "",
  edu10Board: "", edu10Percentage: "", edu10School: "",
  edu12Board: "", edu12Percentage: "", edu12College: "",
  education: "", graduationDetail: "",
  employmentType: "", occupation: "", companyName: "", currencyType: "INR (₹)", annualIncome: "", citizenship: "Indian Citizen", residenceType: "", visaType: "Not Applicable",
  familyStatus: "", familyType: "", fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "", siblings: "", siblingDetails: "",
  gothram: "", raashi: "", star: "", dosham: "",
  aboutMe: "",
};

const SelectField = ({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5 text-gray-600">{label}{required && <span className="ml-1 text-red-500">*</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white">
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TextField = ({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) => (
  <div>
    <label className="block text-sm font-semibold mb-1.5 text-gray-600">{label}{required && <span className="ml-1 text-red-500">*</span>}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white placeholder-gray-400" />
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <div className="col-span-full mb-2 mt-4">
    <h4 className="text-base font-bold px-4 py-3 rounded-xl" style={{ background: "hsl(130, 50%, 92%)", color: "hsl(130, 45%, 28%)", fontFamily: "'Roboto', system-ui, sans-serif" }}>{title}</h4>
  </div>
);

export default function AdminAddProfile({ onProfileAdded }: { onProfileAdded: () => void }) {
  const [form, setForm] = useState<AdminForm>(defaultForm);
  const [photos, setPhotos] = useState<File[]>([]);
  const [primaryPhotoIndex, setPrimaryPhotoIndex] = useState(0);
  const [horoscopeFile, setHoroscopeFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [createdProfileId, setCreatedProfileId] = useState<string | null>(null);
  const { toast } = useToast();

  const set = (field: keyof AdminForm, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter(f => f.size <= 25 * 1024 * 1024);
    const combined = [...photos, ...valid].slice(0, 5);
    setPhotos(combined);
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    if (primaryPhotoIndex >= updated.length) setPrimaryPhotoIndex(0);
  };

  const casteOptions = useMemo(() => {
    if (!form.religion) return ["Other", "No Caste Preference"];
    return casteMappings[form.religion] || ["Other", "No Caste Preference"];
  }, [form.religion]);

  const incomeOptions = useMemo(() => {
    return incomeByCountry[form.currencyType] || incomeByCountry["INR (₹)"];
  }, [form.currencyType]);

  const heightToCm = (h: string): number | null => {
    const m = h.match(/(\d+)'(\d+)"/);
    if (!m) return null;
    return Math.round((parseInt(m[1]) * 12 + parseInt(m[2])) * 2.54);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.gender || !form.dob || !form.phone) {
      toast({ title: "Please fill required fields: Name, Gender, DOB, Phone", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      // Create a temporary auth user for admin-added profiles is not needed
      // Insert directly into profiles table
      let profilePhotoUrl: string | null = null;
      let additionalPhotoUrls: string[] = [];
      let horoscopeUrl: string | null = null;

      // Upload all photos
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const ext = photo.name.split(".").pop();
        const path = `admin/${Date.now()}-photo-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, photo, { upsert: true });
        if (!upErr) {
          const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
          if (i === primaryPhotoIndex) {
            profilePhotoUrl = urlData.publicUrl;
          }
          additionalPhotoUrls.push(urlData.publicUrl);
        }
      }

      if (horoscopeFile) {
        const ext = horoscopeFile.name.split(".").pop();
        const path = `admin/${Date.now()}-horoscope.${ext}`;
        const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, horoscopeFile, { upsert: true });
        if (!upErr) {
          const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
          horoscopeUrl = urlData.publicUrl;
        }
      }

      const heightCm = heightToCm(form.height);
      const educationDetail = [
        form.edu10Board && `10th: ${form.edu10Board} - ${form.edu10Percentage}% - ${form.edu10School}`,
        form.edu12Board && `12th: ${form.edu12Board} - ${form.edu12Percentage}% - ${form.edu12College}`,
        form.graduationDetail && `Degree: ${form.graduationDetail}`
      ].filter(Boolean).join(", ") || null;

      const { data, error } = await supabase.from("profiles").insert({
        full_name: form.name,
        gender: form.gender,
        email: form.email || null,
        phone: form.phone,
        profile_created_by: form.profileFor || "Admin",
        date_of_birth: form.dob,
        mother_tongue: form.motherTongue || null,
        height_cm: heightCm,
        marital_status: form.maritalStatus || "Never Married",
        religion: form.religion || "Hindu",
        caste: form.caste || null,
        sub_caste: form.subCaste || null,
        country: form.country || "India",
        state: form.state || null,
        city: form.city || null,
        native_place: form.village || null,
        education: form.education || null,
        education_detail: educationDetail,
        occupation: form.occupation || null,
        company_name: form.companyName || null,
        annual_income: form.annualIncome || null,
        family_status: form.familyStatus || null,
        family_type: form.familyType || null,
        father_name: form.fatherName || null,
        father_occupation: form.fatherOccupation || null,
        mother_name: form.motherName || null,
        mother_occupation: form.motherOccupation || null,
        siblings: form.siblings || null,
        gothra: form.gothram || null,
        raasi: form.raashi || null,
        star: form.star || null,
        dosham: form.dosham || null,
        whatsapp: form.phone || null,
        profile_photo_url: profilePhotoUrl,
        additional_photos: additionalPhotoUrls.length > 0 ? additionalPhotoUrls : null,
        horoscope_url: horoscopeUrl,
        about_me: form.aboutMe || null,
        citizenship: form.citizenship || null,
        visa_type: form.visaType || null,
        residence_type: form.residenceType || null,
        profile_status: "pending",
      } as any).select("profile_id").single();

      if (error) throw error;

      setCreatedProfileId((data as any)?.profile_id || null);
      setDone(true);
      onProfileAdded();
      toast({ title: "Profile added successfully!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(145, 65%, 93%)" }}>
          <Check size={28} style={{ color: "hsl(145, 65%, 35%)" }} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Created Successfully!</h3>
        {createdProfileId && (
          <p className="text-lg font-bold mb-4" style={{ color: "hsl(210, 80%, 45%)" }}>Profile ID: {createdProfileId}</p>
        )}
        <button onClick={() => { setDone(false); setForm(defaultForm); setPhotos([]); setPrimaryPhotoIndex(0); setHoroscopeFile(null); setCreatedProfileId(null); }} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "hsl(210, 80%, 50%)" }}>
          Add Another Profile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Add New Profile</h3>
        <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new profile directly</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionHeading title="Basic Details" />
          <TextField label="Full Name" value={form.name} onChange={v => set("name", v)} required />
          <SelectField label="Profile For" value={form.profileFor} onChange={v => set("profileFor", v)} options={profileForOptions} />
          <SelectField label="Gender" value={form.gender} onChange={v => set("gender", v)} options={genderOptions} required />
          <TextField label="Email" value={form.email} onChange={v => set("email", v)} type="email" />
          <TextField label="Phone" value={form.phone} onChange={v => set("phone", v)} required />
          <TextField label="Date of Birth" value={form.dob} onChange={v => set("dob", v)} type="date" required />
          <SelectField label="Mother Tongue" value={form.motherTongue} onChange={v => set("motherTongue", v)} options={motherTongueOptions} />
          <SelectField label="Height" value={form.height} onChange={v => set("height", v)} options={heightOptions} />
          <SelectField label="Marital Status" value={form.maritalStatus} onChange={v => set("maritalStatus", v)} options={maritalStatusOptions} />

          <SectionHeading title="Personal Details" />
          <SelectField label="Religion" value={form.religion} onChange={v => { set("religion", v); set("caste", ""); set("subCaste", ""); }} options={religionOptions} />
          <SelectField label="Caste" value={form.caste} onChange={v => set("caste", v)} options={casteOptions} />
          <TextField label="Sub Caste" value={form.subCaste} onChange={v => set("subCaste", v)} />
          <SelectField label="Country" value={form.country} onChange={v => set("country", v)} options={countryOptions} />
          {form.country === "India" && <SelectField label="State" value={form.state} onChange={v => set("state", v)} options={indianStates} />}
          <TextField label="City" value={form.city} onChange={v => set("city", v)} />
          <TextField label="Native Place / Village" value={form.village} onChange={v => set("village", v)} />

          <SectionHeading title="10th Standard Details" />
          <SelectField label="10th Board" value={form.edu10Board} onChange={v => set("edu10Board", v)} options={board10Options} />
          <TextField label="10th Percentage (%)" value={form.edu10Percentage} onChange={v => set("edu10Percentage", v)} placeholder="e.g. 85" />
          <TextField label="10th School Name" value={form.edu10School} onChange={v => set("edu10School", v)} />

          <SectionHeading title="12th / Intermediate Details" />
          <SelectField label="12th Board" value={form.edu12Board} onChange={v => set("edu12Board", v)} options={board12Options} />
          <TextField label="12th Percentage (%)" value={form.edu12Percentage} onChange={v => set("edu12Percentage", v)} placeholder="e.g. 90" />
          <TextField label="12th College Name" value={form.edu12College} onChange={v => set("edu12College", v)} />

          <SectionHeading title="Education & Career" />
          <SelectField label="Education" value={form.education} onChange={v => set("education", v)} options={educationOptions} />
          <SelectField label="Graduation / Degree" value={form.graduationDetail} onChange={v => set("graduationDetail", v)} options={graduationDetailsOptions} />
          <SelectField label="Employment Type" value={form.employmentType} onChange={v => set("employmentType", v)} options={employmentOptions} />
          <TextField label="Occupation" value={form.occupation} onChange={v => set("occupation", v)} />
          <TextField label="Company Name" value={form.companyName} onChange={v => set("companyName", v)} />
          <SelectField label="Currency" value={form.currencyType} onChange={v => set("currencyType", v)} options={currencyOptions} />
          <SelectField label="Annual Income" value={form.annualIncome} onChange={v => set("annualIncome", v)} options={incomeOptions} />
          <SelectField label="Citizenship" value={form.citizenship} onChange={v => set("citizenship", v)} options={citizenshipOptions} />
          <SelectField label="Residence Type" value={form.residenceType} onChange={v => set("residenceType", v)} options={residenceOptions} />
          <SelectField label="Visa Type" value={form.visaType} onChange={v => set("visaType", v)} options={visaOptions} />

          <SectionHeading title="Family Details" />
          <SelectField label="Family Status" value={form.familyStatus} onChange={v => set("familyStatus", v)} options={familyStatusOptions} />
          <SelectField label="Family Type" value={form.familyType} onChange={v => set("familyType", v)} options={familyTypeOptions} />
          <TextField label="Father's Name" value={form.fatherName} onChange={v => set("fatherName", v)} />
          <TextField label="Father's Occupation" value={form.fatherOccupation} onChange={v => set("fatherOccupation", v)} />
          <TextField label="Mother's Name" value={form.motherName} onChange={v => set("motherName", v)} />
          <TextField label="Mother's Occupation" value={form.motherOccupation} onChange={v => set("motherOccupation", v)} />
          <SelectField label="Siblings" value={form.siblings} onChange={v => set("siblings", v)} options={siblingsOptions} />
          <TextField label="Sibling Details" value={form.siblingDetails} onChange={v => set("siblingDetails", v)} />

          <SectionHeading title="Horoscope Details" />
          <SelectField label="Gothram" value={form.gothram} onChange={v => set("gothram", v)} options={gothramOptions} />
          <SelectField label="Raashi" value={form.raashi} onChange={v => set("raashi", v)} options={raashiOptions} />
          <SelectField label="Star" value={form.star} onChange={v => set("star", v)} options={starOptions} />
          <SelectField label="Dosham" value={form.dosham} onChange={v => set("dosham", v)} options={doshamOptions} />

          <SectionHeading title="About & Photos" />
          <div className="col-span-full">
            <label className="block text-sm font-semibold mb-1.5 text-gray-600">About Me</label>
            <textarea value={form.aboutMe} onChange={e => set("aboutMe", e.target.value)} rows={3} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" placeholder="Write a brief description..." />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-600">Profile Photo</label>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-gray-50">
              <Upload size={16} className="text-gray-400" />
              <span className="text-gray-500 truncate">{profilePhoto ? profilePhoto.name : "Choose photo"}</span>
              <input type="file" className="hidden" accept="image/*" onChange={e => setProfilePhoto(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-600">Horoscope File</label>
            <label className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-gray-50">
              <Upload size={16} className="text-gray-400" />
              <span className="text-gray-500 truncate">{horoscopeFile ? horoscopeFile.name : "Choose file"}</span>
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={e => setHoroscopeFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={handleSubmit} disabled={saving} className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60" style={{ background: "hsl(145, 65%, 42%)" }}>
            {saving ? "Creating Profile..." : "Create Profile"}
          </button>
          <button onClick={() => { setForm(defaultForm); setProfilePhoto(null); setHoroscopeFile(null); }} className="px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
