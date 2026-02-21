import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check, Upload, Star } from "lucide-react";
import BackButton from "@/components/BackButton";

const TOTAL_STEPS = 6;

const profileForOptions = ["Self", "Son", "Daughter", "Brother", "Sister", "Friend", "Relative"];
const genderOptions = ["Male", "Female"];
const motherTongueOptions = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "English", "Marathi", "Bengali", "Gujarati", "Other"];
const heightOptions = Array.from({ length: 26 }, (_, i) => {
  const totalInches = 54 + i;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
});
const maritalStatusOptions = ["Never Married", "Divorced", "Widowed", "Separated"];
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"];
const casteOptions = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Other", "No Caste Preference"];
const countryOptions = ["India", "USA", "UK", "Canada", "Australia", "UAE", "Singapore", "Germany", "Other"];
const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
const educationOptions = ["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Degree (CA/CS/ICWA)", "Other"];
const employmentOptions = ["Private Sector", "Government", "Self Employed / Business", "Public Sector", "Defence", "Not Working", "Other"];
const incomeOptions = ["Below 1 Lakh", "1–3 Lakhs", "3–5 Lakhs", "5–7 Lakhs", "7–10 Lakhs", "10–15 Lakhs", "15–20 Lakhs", "20–30 Lakhs", "30–50 Lakhs", "50–75 Lakhs", "75 Lakhs+"];
const citizenshipOptions = ["Indian", "NRI", "Foreign National", "Other"];
const residenceOptions = ["Own House", "Rented", "With Family", "Other"];
const visaOptions = ["Not Applicable", "Work Visa", "Student Visa", "PR / Permanent Resident", "Citizen", "Other"];
const familyStatusOptions = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
const familyTypeOptions = ["Joint Family", "Nuclear Family", "Extended Family"];
const siblingsOptions = ["No Siblings", "1 Brother", "2 Brothers", "3+ Brothers", "1 Sister", "2 Sisters", "3+ Sisters", "1 Brother 1 Sister", "Multiple Siblings"];
const gothramOptions = ["Kashyapa", "Bharadwaja", "Vasistha", "Atri", "Viswamitra", "Agastya", "Garga", "Jamadagni", "Shandilya", "Other"];
const raashiOptions = ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"];
const starOptions = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
const doshamOptions = ["No Dosham", "Chevvai Dosham", "Rahu Dosham", "Kethu Dosham", "Shani Dosham", "Not Known"];
const languageOptions = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "Sanskrit", "English", "Other"];
const chartStyleOptions = ["South Indian", "North Indian", "East Indian", "Sri Lankan"];

const stepTitles = ["Basic Details", "Personal Details", "Family Details", "Horoscope", "Photo Upload", "Review & Submit"];

type FormData = {
  name: string; profileFor: string; gender: string; email: string; phone: string; password: string; confirmPassword: string;
  dob: string; motherTongue: string; height: string; maritalStatus: string; religion: string; caste: string; subCaste: string;
  country: string; state: string; city: string; village: string; edu10: string; edu12: string; education: string;
  employmentType: string; occupation: string; companyName: string; annualIncome: string; citizenship: string; residenceType: string; visaType: string;
  familyStatus: string; familyType: string; fatherName: string; fatherOccupation: string; motherName: string; motherOccupation: string; siblings: string; siblingDetails: string;
  gothram: string; raashi: string; star: string; dosham: string; timeOfBirth: string; countryOfBirth: string; stateOfBirth: string; birthPlace: string; language: string; chartStyle: string; horoscopeFile: File | null;
  photos: File[]; primaryPhotoIndex: number;
};

const defaultForm: FormData = {
  name: "", profileFor: "", gender: "", email: "", phone: "", password: "", confirmPassword: "",
  dob: "", motherTongue: "", height: "", maritalStatus: "", religion: "", caste: "", subCaste: "",
  country: "India", state: "", city: "", village: "", edu10: "", edu12: "", education: "",
  employmentType: "", occupation: "", companyName: "", annualIncome: "", citizenship: "Indian", residenceType: "", visaType: "Not Applicable",
  familyStatus: "", familyType: "", fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "", siblings: "", siblingDetails: "",
  gothram: "", raashi: "", star: "", dosham: "", timeOfBirth: "", countryOfBirth: "India", stateOfBirth: "", birthPlace: "", language: "", chartStyle: "South Indian", horoscopeFile: null,
  photos: [], primaryPhotoIndex: 0,
};

const SelectField = ({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-gray-800">
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TextField = ({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-gray-800 placeholder-gray-400" />
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold text-gray-500">{label}</span>
    <span className="text-xs text-gray-800 text-right max-w-[55%]">{value || "—"}</span>
  </div>
);

const SummarySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h4 className="text-sm font-bold mb-2 px-3 py-1.5 rounded-lg" style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--burgundy))" }}>{title}</h4>
    <div className="px-1">{children}</div>
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
        p_education_detail: form.edu10 && form.edu12 ? `10th: ${form.edu10}, 12th: ${form.edu12}` : null,
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
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(var(--cream))" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Registration Complete!</h2>
          <p className="text-gray-500 mb-4 text-sm">Your profile has been submitted. Our team will review and activate it within 24 hours.</p>
          <p className="text-xs text-gray-400 mb-6">Please check your email to verify your account.</p>
          <button onClick={() => navigate("/")} className="btn-burgundy">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4" style={{ background: "hsl(var(--cream))" }}>
      <div className="max-w-2xl mx-auto">
        {/* Back + Logo */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <BackButton to="/" label="Home" />
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
              <span className="font-serif text-base font-bold text-white">K</span>
            </div>
            <span className="font-serif text-base sm:text-lg font-semibold" style={{ color: "hsl(var(--burgundy))" }}>Kalyanasuthra</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1 bg-gray-100 relative">
            <motion.div className="absolute top-0 left-0 h-full rounded-full" style={{ background: "hsl(var(--burgundy))" }} animate={{ width: `${progress + (100 / TOTAL_STEPS)}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-0 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[320px]">
              {stepTitles.map((title, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all" style={
                    i + 1 < step ? { background: "hsl(var(--burgundy))", color: "white" }
                    : i + 1 === step ? { background: "hsl(var(--burgundy))", color: "white", boxShadow: "0 0 0 3px hsl(var(--burgundy) / 0.2)" }
                    : { background: "#f0f0f0", color: "#aaa" }
                  }>
                    {i + 1 < step ? <Check size={11} /> : i + 1}
                  </div>
                  <span className="text-[8px] sm:text-[9px] whitespace-nowrap" style={{ color: i + 1 === step ? "hsl(var(--burgundy))" : "#aaa", fontWeight: i + 1 === step ? 600 : 400 }}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold mb-1" style={{ color: "hsl(var(--burgundy))" }}>
              Step {step}: {stepTitles[step - 1]}
            </h2>
            <p className="text-xs text-gray-400 mb-4 sm:mb-6">Fill in accurate details for the best matches</p>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>

                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <TextField label="Full Name" value={form.name} onChange={v => set("name", v)} required />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <SelectField label="Profile For" value={form.profileFor} onChange={v => set("profileFor", v)} options={profileForOptions} required />
                    <SelectField label="Gender" value={form.gender} onChange={v => set("gender", v)} options={genderOptions} required />
                    <div className="sm:col-span-2">
                      <TextField label="Email" value={form.email} onChange={v => set("email", v)} type="email" required />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <TextField label="Phone Number" value={form.phone} onChange={v => set("phone", v)} type="tel" required />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2 relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min. 8 characters" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div className="sm:col-span-2 relative">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)} placeholder="Re-enter password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label>
                      <input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <SelectField label="Mother Tongue" value={form.motherTongue} onChange={v => set("motherTongue", v)} options={motherTongueOptions} />
                    <SelectField label="Height" value={form.height} onChange={v => set("height", v)} options={heightOptions} />
                    <SelectField label="Marital Status" value={form.maritalStatus} onChange={v => set("maritalStatus", v)} options={maritalStatusOptions} />
                    <SelectField label="Religion" value={form.religion} onChange={v => set("religion", v)} options={religionOptions} />
                    <SelectField label="Caste" value={form.caste} onChange={v => set("caste", v)} options={casteOptions} />
                    <TextField label="Sub Caste" value={form.subCaste} onChange={v => set("subCaste", v)} />
                    <SelectField label="Country" value={form.country} onChange={v => set("country", v)} options={countryOptions} />
                    <SelectField label="State" value={form.state} onChange={v => set("state", v)} options={indianStates} />
                    <TextField label="City" value={form.city} onChange={v => set("city", v)} />
                    <TextField label="Village / Native Place" value={form.village} onChange={v => set("village", v)} />
                    <TextField label="10th Education Details" value={form.edu10} onChange={v => set("edu10", v)} />
                    <TextField label="12th Education Details" value={form.edu12} onChange={v => set("edu12", v)} />
                    <SelectField label="Education / Graduation" value={form.education} onChange={v => set("education", v)} options={educationOptions} />
                    <SelectField label="Employment Type" value={form.employmentType} onChange={v => set("employmentType", v)} options={employmentOptions} />
                    <TextField label="Occupation" value={form.occupation} onChange={v => set("occupation", v)} />
                    <TextField label="Company Name" value={form.companyName} onChange={v => set("companyName", v)} />
                    <SelectField label="Annual Income" value={form.annualIncome} onChange={v => set("annualIncome", v)} options={incomeOptions} />
                    <SelectField label="Citizenship" value={form.citizenship} onChange={v => set("citizenship", v)} options={citizenshipOptions} />
                    <SelectField label="Residence Type" value={form.residenceType} onChange={v => set("residenceType", v)} options={residenceOptions} />
                    <SelectField label="Visa Type" value={form.visaType} onChange={v => set("visaType", v)} options={visaOptions} />
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Upload Horoscope (PDF/Image)</label>
                      <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary/40 transition-colors">
                        <Upload size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-500">{form.horoscopeFile ? form.horoscopeFile.name : "Click to upload horoscope file"}</span>
                        <input type="file" className="hidden" accept="*/*" onChange={e => set("horoscopeFile", e.target.files?.[0] || null)} />
                      </label>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Upload Photos (Max 5, each below 25MB)</label>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 sm:p-8 cursor-pointer hover:border-primary/40 transition-colors">
                        <Upload size={28} className="text-gray-300 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload photos</span>
                        <span className="text-xs text-gray-400 mt-1">{form.photos.length}/5 uploaded</span>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={e => handlePhotoUpload(e.target.files)} />
                      </label>
                    </div>
                    {form.photos.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-3">Select Primary Photo <Star size={12} className="inline text-yellow-500" /></p>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                          {form.photos.map((photo, i) => (
                            <div key={i} className="relative cursor-pointer" onClick={() => set("primaryPhotoIndex", i)}>
                              <img src={URL.createObjectURL(photo)} alt="" className="w-full aspect-square object-cover rounded-lg" />
                              {i === form.primaryPhotoIndex && (
                                <div className="absolute inset-0 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--burgundy) / 0.5)" }}>
                                  <Star size={20} className="text-white fill-white" />
                                </div>
                              )}
                              <button onClick={e => { e.stopPropagation(); const p = form.photos.filter((_, j) => j !== i); set("photos", p); if (form.primaryPhotoIndex >= p.length) set("primaryPhotoIndex", 0); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    <SummarySection title="📋 Basic Details">
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
                      <SummaryRow label="10th Education" value={form.edu10} />
                      <SummaryRow label="12th Education" value={form.edu12} />
                      <SummaryRow label="Education" value={form.education} />
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
                    <SummarySection title="📷 Photos">
                      <SummaryRow label="Photos Uploaded" value={`${form.photos.length} photo(s)`} />
                      {form.photos.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {form.photos.map((photo, i) => (
                            <div key={i} className="relative">
                              <img src={URL.createObjectURL(photo)} alt="" className="w-full aspect-square object-cover rounded-lg" />
                              {i === form.primaryPhotoIndex && (
                                <div className="absolute top-1 right-1">
                                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </SummarySection>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-6 sm:mt-8">
              {step > 1 && (
                <button onClick={back} className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button onClick={next} className="btn-burgundy ml-auto flex items-center gap-1 sm:gap-2 text-sm">
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSave} disabled={saving} className="btn-burgundy ml-auto flex items-center gap-1 sm:gap-2 text-sm disabled:opacity-60">
                  {saving ? "Saving..." : "Submit Registration"} <Check size={16} />
                </button>
              )}
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Already registered? <a href="/login" className="font-semibold" style={{ color: "hsl(var(--burgundy))" }}>Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
