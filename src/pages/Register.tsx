import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Check, Upload, Star } from "lucide-react";

const TOTAL_STEPS = 5;

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

const stepTitles = ["Basic Details", "Personal Details", "Family Details", "Horoscope", "Photo Upload"];

type FormData = {
  // Step 1
  name: string; profileFor: string; gender: string; email: string; phone: string; password: string; confirmPassword: string;
  // Step 2
  dob: string; motherTongue: string; height: string; maritalStatus: string; religion: string; caste: string; subCaste: string;
  country: string; state: string; city: string; village: string; edu10: string; edu12: string; education: string;
  employmentType: string; occupation: string; companyName: string; annualIncome: string; citizenship: string; residenceType: string; visaType: string;
  // Step 3
  familyStatus: string; familyType: string; fatherName: string; fatherOccupation: string; motherName: string; motherOccupation: string; siblings: string; siblingDetails: string;
  // Step 4
  gothram: string; raashi: string; star: string; dosham: string; timeOfBirth: string; countryOfBirth: string; stateOfBirth: string; birthPlace: string; language: string; chartStyle: string; horoscopeFile: File | null;
  // Step 5
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
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-gray-800"
    >
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const TextField = ({ label, value, onChange, placeholder, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || label}
      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white text-gray-800 placeholder-gray-400"
    />
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

      const heightCm = form.height ? Math.round((parseInt(form.height) * 12 + parseInt(form.height.split("'")[1] || "0")) * 2.54) : null;

      const { error: profileErr } = await supabase.from("profiles").insert({
        user_id: userId,
        full_name: form.name,
        gender: form.gender,
        email: form.email,
        phone: form.phone,
        profile_created_by: form.profileFor,
        date_of_birth: form.dob,
        mother_tongue: form.motherTongue,
        height_cm: heightCm,
        marital_status: form.maritalStatus || "Never Married",
        religion: form.religion || "Hindu",
        caste: form.caste,
        sub_caste: form.subCaste,
        country: form.country,
        state: form.state,
        city: form.city,
        native_place: form.village,
        education: form.education,
        occupation: form.occupation,
        company_name: form.companyName,
        annual_income: form.annualIncome,
        family_status: form.familyStatus,
        family_type: form.familyType,
        father_name: form.fatherName,
        father_occupation: form.fatherOccupation,
        mother_name: form.motherName,
        mother_occupation: form.motherOccupation,
        siblings: form.siblings,
        gothra: form.gothram,
        raasi: form.raashi,
        star: form.star,
        dosham: form.dosham,
        whatsapp: form.phone,
        profile_photo_url: profilePhotoUrl,
        profile_status: "pending",
      });

      if (profileErr) throw profileErr;

      setDone(true);
      toast({ title: "Registration successful!", description: "Your profile has been submitted for review." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--cream))" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Registration Complete!</h2>
          <p className="text-gray-500 mb-6">Your profile has been submitted. Our team will review and activate it within 24 hours.</p>
          <button onClick={() => navigate("/")} className="btn-burgundy">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "hsl(var(--cream))" }}>
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
              <span className="font-serif text-base font-bold text-white">K</span>
            </div>
            <span className="font-serif text-lg font-semibold" style={{ color: "hsl(var(--burgundy))" }}>Kalyanasuthra Matrimony</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-100 relative">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ background: "hsl(var(--burgundy))" }}
              animate={{ width: `${progress + 20}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Step indicator */}
          <div className="px-8 pt-6 pb-0">
            <div className="flex items-center justify-between mb-1">
              {stepTitles.map((title, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={
                      i + 1 < step
                        ? { background: "hsl(var(--burgundy))", color: "white" }
                        : i + 1 === step
                        ? { background: "hsl(var(--burgundy))", color: "white", boxShadow: "0 0 0 3px hsl(var(--burgundy) / 0.2)" }
                        : { background: "#f0f0f0", color: "#aaa" }
                    }
                  >
                    {i + 1 < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span className="text-[9px] hidden sm:block" style={{ color: i + 1 === step ? "hsl(var(--burgundy))" : "#aaa", fontWeight: i + 1 === step ? 600 : 400 }}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 py-6">
            <h2 className="text-xl font-serif font-bold mb-1" style={{ color: "hsl(var(--burgundy))" }}>
              Step {step}: {stepTitles[step - 1]}
            </h2>
            <p className="text-xs text-gray-400 mb-6">Fill in accurate details for the best matches</p>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>

                {/* STEP 1 */}
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
                    <div className="relative">
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

                {/* STEP 2 */}
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

                {/* STEP 3 */}
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

                {/* STEP 4 */}
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

                {/* STEP 5 */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Upload Photos (Max 5, each below 25MB)</label>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-primary/40 transition-colors">
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

                    {/* Summary */}
                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                      <h3 className="font-semibold text-sm text-gray-700 mb-3">Registration Summary</h3>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div><span className="font-medium">Name:</span> {form.name || "—"}</div>
                        <div><span className="font-medium">Gender:</span> {form.gender || "—"}</div>
                        <div><span className="font-medium">Email:</span> {form.email || "—"}</div>
                        <div><span className="font-medium">Phone:</span> {form.phone || "—"}</div>
                        <div><span className="font-medium">DOB:</span> {form.dob || "—"}</div>
                        <div><span className="font-medium">Religion:</span> {form.religion || "—"}</div>
                        <div><span className="font-medium">Caste:</span> {form.caste || "—"}</div>
                        <div><span className="font-medium">Education:</span> {form.education || "—"}</div>
                        <div><span className="font-medium">Occupation:</span> {form.occupation || "—"}</div>
                        <div><span className="font-medium">City:</span> {form.city || "—"}</div>
                        <div><span className="font-medium">Rashi:</span> {form.raashi || "—"}</div>
                        <div><span className="font-medium">Star:</span> {form.star || "—"}</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button onClick={next} className="btn-burgundy ml-auto flex items-center gap-2">
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSave} disabled={saving} className="btn-burgundy ml-auto flex items-center gap-2 disabled:opacity-60">
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
