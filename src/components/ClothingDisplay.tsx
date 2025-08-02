import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClothingType {
  id: string;
  name: string;
  description: string;
  category: string;
  base_price: number;
  image_url: string;
  is_active: boolean;
}

export const ClothingDisplay = () => {
  const [clothingTypes, setClothingTypes] = useState<ClothingType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothingTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('clothing_types')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setClothingTypes(data || []);
      } catch (error) {
        console.error('Error fetching clothing types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothingTypes();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-lg mb-4"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-3 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clothingTypes.map((clothing) => (
        <Card key={clothing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={clothing.image_url}
              alt={clothing.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
            />
          </div>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{clothing.name}</CardTitle>
              <Badge variant="secondary" className="ml-2">
                {clothing.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm mb-3">
              {clothing.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-primary">
                ${clothing.base_price}
              </span>
              <span className="text-sm text-muted-foreground">
                Starting price
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};