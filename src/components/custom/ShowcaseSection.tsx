import { Button } from "@/components/ui/glass/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/glass/card";
import { Badge } from "@/components/ui/glass/badge";
import { Input } from "@/components/ui/glass/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Send,
  Mail,
  Lock,
  User,
  CreditCard,
  Settings,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export function ShowcaseSection() {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Settings */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </CardTitle>
          <CardDescription>Appearance preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="settings-dark-mode" className="text-sm">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Use dark theme</p>
            </div>
            <label htmlFor="settings-dark-mode" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="settings-dark-mode" className="sr-only peer" aria-label="Toggle dark mode" />
              <div className="w-9 h-5 rounded-full peer peer-checked:bg-primary/80 glass-bg peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm" />
            </label>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="settings-volume" className="text-sm">Volume</Label>
            <input
              type="range"
              id="settings-volume"
              defaultValue={65}
              min={0}
              max={100}
              aria-label="Volume level control"
              className="w-full h-2 rounded-lg appearance-none cursor-pointer glass-bg accent-primary"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="settings-notifications" className="text-sm">Notifications</Label>
              <p className="text-xs text-muted-foreground">Push alerts</p>
            </div>
            <label htmlFor="settings-notifications" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="settings-notifications" defaultChecked className="sr-only peer" aria-label="Toggle push alerts" />
              <div className="w-9 h-5 rounded-full peer peer-checked:bg-primary/80 glass-bg peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm" />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Chat
          </CardTitle>
          <CardDescription>Conversational interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs shrink-0">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="glass-bg rounded-lg px-3 py-2">
                <p className="text-sm">How can I help you today?</p>
              </div>
            </div>
            <div className="flex items-start gap-2 justify-end">
              <div className="glass-bg rounded-lg px-3 py-2 max-w-[80%]">
                <p className="text-sm">Show me the glass variants.</p>
              </div>
              <div className="h-7 w-7 rounded-full flex items-center justify-center glass-bg border border-[var(--glass-border)] text-xs text-foreground font-medium shrink-0">
                U
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input variant="glass" placeholder="Type a message..." aria-label="Type a chat message" className="flex-1 min-w-0" />
            <Button variant="glass" size="icon" aria-label="Send chat message" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
          <CardDescription>User information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-[var(--glass-border)] text-sm font-semibold text-foreground shrink-0">
              AJ
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">Akshay Joshi</div>
              <div className="text-xs text-muted-foreground">Developer</div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="glass" className="bg-green-500/20 text-green-600 dark:text-green-400">Active</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium text-foreground">Admin</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" size="sm">View Profile</Button>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Metrics
          </CardTitle>
          <CardDescription>Key performance data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="glass-bg rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Revenue</span>
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">$45,231</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +20.1% from last month
            </p>
          </div>
          <div className="glass-bg rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Users</span>
              <User className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">2,350</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +12.5% from last month
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </CardTitle>
          <CardDescription>Saved payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="glass-bg rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <Badge variant="glass">Primary</Badge>
            </div>
            <p className="text-sm font-mono tracking-wider text-foreground">**** **** **** 4242</p>
            <p className="text-xs text-muted-foreground mt-1">Expires 12/27</p>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </CardContent>
      </Card>

      {/* Sign In */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Sign In
          </CardTitle>
          <CardDescription>Authentication form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            variant="glass"
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
          />
          <Input
            variant="glass"
            type="password"
            placeholder="Password"
            aria-label="Password"
            icon={<Lock className="h-4 w-4 text-muted-foreground" />}
          />
          <Button variant="glass" className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
