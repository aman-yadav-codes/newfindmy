"use client";

import { Button } from "@/components/ui/glass/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card";
import { Badge } from "@/components/ui/glass/badge";
import { Input } from "@/components/ui/glass/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/glass/tabs";

const VARIANTS = ["glass", "frosted", "fluted", "crystal"] as const;

export function InteractiveVariantsSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="glass">
        <TabsList variant="glass" className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="glass">Glass</TabsTrigger>
          <TabsTrigger value="frosted">Frosted</TabsTrigger>
          <TabsTrigger value="fluted">Fluted</TabsTrigger>
          <TabsTrigger value="crystal">Crystal</TabsTrigger>
        </TabsList>

        {VARIANTS.map((v) => (
          <TabsContent key={v} value={v}>
            <Card variant={v}>
              <CardHeader>
                <CardTitle className="capitalize">{v} Variant</CardTitle>
                <CardDescription>
                  See how every primitive adapts to the {v} style.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={v}>Badge</Badge>
                  <Badge variant={v}>Status</Badge>
                  <Badge variant={v}>Tag</Badge>
                </div>
                <Input
                  variant={v}
                  placeholder={`${v} input...`}
                  aria-label={`${v} variant sample input`}
                />
                <div className="flex gap-3">
                  <Button variant={v} className="flex-1">
                    Primary
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Secondary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
