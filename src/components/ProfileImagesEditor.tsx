import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Star, X, FileText } from "lucide-react";

type Props = {
  profileId: string;
  primaryUrl: string | null;
  additionalUrls: string[];
  horoscopeUrl: string | null;
  onChange: (updates: { profile_photo_url?: string | null; additional_photos?: string[]; horoscope_url?: string | null }) => void;
};

export default function ProfileImagesEditor({ profileId, primaryUrl, additionalUrls, horoscopeUrl, onChange }: Props) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const allPhotos = [primaryUrl, ...(additionalUrls || []).filter(u => u && u !== primaryUrl)].filter(Boolean) as string[];

  const uploadPhotos = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const valid = Array.from(files).filter(f => f.size <= 25 * 1024 * 1024);
      if (valid.length === 0) {
        toast({ title: "Files must be under 25MB each", variant: "destructive" });
        return;
      }
      const remainingSlots = Math.max(0, 5 - allPhotos.length);
      const toUpload = valid.slice(0, remainingSlots);
      if (toUpload.length === 0) {
        toast({ title: "Maximum 5 photos allowed", variant: "destructive" });
        return;
      }
      const newUrls: string[] = [];
      for (let i = 0; i < toUpload.length; i++) {
        const f = toUpload[i];
        const ext = f.name.split(".").pop();
        const path = `${profileId}/${Date.now()}-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, f, { upsert: true });
        if (upErr) {
          toast({ title: "Upload error", description: upErr.message, variant: "destructive" });
          continue;
        }
        const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
        newUrls.push(urlData.publicUrl);
      }
      const updatedAll = [...allPhotos, ...newUrls];
      const newPrimary = primaryUrl || updatedAll[0] || null;
      const newAdditional = updatedAll.filter(u => u !== newPrimary);
      onChange({ profile_photo_url: newPrimary, additional_photos: newAdditional });
      if (newUrls.length > 0) toast({ title: `Uploaded ${newUrls.length} photo${newUrls.length > 1 ? "s" : ""}` });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (url: string) => {
    const updated = allPhotos.filter(u => u !== url);
    const newPrimary = url === primaryUrl ? (updated[0] || null) : primaryUrl;
    const newAdditional = updated.filter(u => u !== newPrimary);
    onChange({ profile_photo_url: newPrimary, additional_photos: newAdditional });
  };

  const setPrimary = (url: string) => {
    const newAdditional = allPhotos.filter(u => u !== url);
    onChange({ profile_photo_url: url, additional_photos: newAdditional });
  };

  const uploadHoroscope = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${profileId}/horoscope-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, file, { upsert: true });
      if (upErr) {
        toast({ title: "Upload error", description: upErr.message, variant: "destructive" });
        return;
      }
      const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
      onChange({ horoscope_url: urlData.publicUrl });
      toast({ title: "Horoscope uploaded" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">📸 Photos & Horoscope</h3>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-600">Profile Photos ({allPhotos.length}/5)</p>
          {allPhotos.length < 5 && (
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all" style={{ background: "hsl(210, 80%, 95%)", color: "hsl(210, 80%, 40%)" }}>
              <Upload size={14} /> {uploading ? "Uploading..." : "Add Photos"}
              <input type="file" className="hidden" accept="image/*" multiple disabled={uploading} onChange={e => uploadPhotos(e.target.files)} />
            </label>
          )}
        </div>
        {allPhotos.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No photos. Click "Add Photos" to upload.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allPhotos.map((url, i) => (
              <div key={url + i} className="relative rounded-xl overflow-hidden group" style={{ border: url === primaryUrl ? "3px solid hsl(210, 80%, 55%)" : "2px solid #eee" }}>
                <img src={url} alt="" className="w-full aspect-[3/4] object-cover" />
                {url === primaryUrl && (
                  <span className="absolute top-1 left-1 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1" style={{ background: "hsl(210, 80%, 50%)" }}>
                    <Star size={10} className="fill-white" /> Primary
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex gap-1 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                  {url !== primaryUrl && (
                    <button type="button" onClick={() => setPrimary(url)} className="flex-1 px-2 py-1 rounded text-[10px] font-bold text-white" style={{ background: "hsl(210, 80%, 55%)" }}>Set Primary</button>
                  )}
                  <button type="button" onClick={() => removePhoto(url)} className="px-2 py-1 rounded text-[10px] font-bold text-white" style={{ background: "hsl(0, 65%, 55%)" }}>
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">Horoscope File</p>
        {horoscopeUrl ? (
          <div className="flex items-center gap-3 flex-wrap">
            <a href={horoscopeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-md" style={{ background: "hsl(210, 80%, 96%)", color: "hsl(210, 80%, 45%)" }}>
              <FileText size={16} /> View Current Horoscope
            </a>
            <button type="button" onClick={() => onChange({ horoscope_url: null })} className="px-3 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: "hsl(0, 65%, 55%)" }}>
              Remove
            </button>
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer" style={{ background: "hsl(210, 80%, 95%)", color: "hsl(210, 80%, 40%)" }}>
              <Upload size={14} /> Replace
              <input type="file" className="hidden" accept="image/*,.pdf" disabled={uploading} onChange={e => uploadHoroscope(e.target.files?.[0] || null)} />
            </label>
          </div>
        ) : (
          <label className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 max-w-sm">
            <Upload size={16} className="text-gray-400" />
            <span className="text-gray-500">{uploading ? "Uploading..." : "Upload horoscope"}</span>
            <input type="file" className="hidden" accept="image/*,.pdf" disabled={uploading} onChange={e => uploadHoroscope(e.target.files?.[0] || null)} />
          </label>
        )}
      </div>
    </div>
  );
}