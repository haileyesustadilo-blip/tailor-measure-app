import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, Ruler, Camera, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    height: "",
    notes: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'receipt') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'photo') {
        setPhotoFile(file);
      } else {
        setReceiptFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.height || !photoFile || !receiptFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload both files.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here we would implement the actual submission logic with Supabase
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order Submitted Successfully",
        description: "Your custom clothing order has been received. We'll contact you soon!",
      });
      
      // Reset form
      setFormData({ fullName: "", height: "", notes: "" });
      setPhotoFile(null);
      setReceiptFile(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Custom Order Form</CardTitle>
        <CardDescription>
          Provide your measurements and details for your bespoke clothing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Height (cm) *
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter your height in centimeters"
              required
            />
          </div>

          {/* Personal Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Personal Photo *
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'photo')}
                className="hidden"
                required
              />
              <label htmlFor="photo" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {photoFile ? photoFile.name : "Click to upload your photo"}
                </p>
              </label>
            </div>
          </div>

          {/* Payment Receipt Upload */}
          <div className="space-y-2">
            <Label htmlFor="receipt" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Payment Receipt *
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
              <input
                id="receipt"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, 'receipt')}
                className="hidden"
                required
              />
              <label htmlFor="receipt" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {receiptFile ? receiptFile.name : "Click to upload payment receipt"}
                </p>
              </label>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special requests or notes..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="premium" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Order..." : "Submit Custom Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};