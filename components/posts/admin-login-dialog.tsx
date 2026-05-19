"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/actions/auth";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AdminLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminLoginDialog({ open, onOpenChange }: AdminLoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Welcome back, Bratik!");
      onOpenChange(false);
    } else {
      toast.error(result.error || "Login failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-950/90 backdrop-blur-3xl border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <DialogHeader className="items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter text-white">Identity Verification</DialogTitle>
          <DialogDescription className="text-slate-400 font-light mt-2">
            Authenticate to manage your cinematic chronicles.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-slate-300 ml-1">Admin ID</Label>
            <Input 
              id="id" 
              name="id" 
              placeholder="Enter your ID" 
              required 
              className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-primary focus:border-primary placeholder:text-slate-700 px-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" d className="text-sm font-medium text-slate-300 ml-1">Secure Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-primary focus:border-primary placeholder:text-slate-700 px-6"
            />
          </div>
          <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Access Sanctuary"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
