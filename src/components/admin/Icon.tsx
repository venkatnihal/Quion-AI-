import {
  LayoutDashboard, BarChart3, FileText, Wrench, FolderKanban, Quote, HelpCircle,
  Image as ImageIcon, Search, Bot, Users, CalendarCheck, MessagesSquare, Settings,
  Shield, ScrollText, BrainCircuit, Plus, Trash2, Pencil, Save, X, Check, Download,
  LogOut, ExternalLink, Eye, EyeOff, ChevronRight, Menu, Star, RefreshCw, Upload,
  Copy, GripVertical, AlertTriangle, type LucideProps,
} from "lucide-react";

const MAP = {
  LayoutDashboard, BarChart3, FileText, Wrench, FolderKanban, Quote, HelpCircle,
  Image: ImageIcon, Search, Bot, Users, CalendarCheck, MessagesSquare, Settings,
  Shield, ScrollText, BrainCircuit, Plus, Trash2, Pencil, Save, X, Check, Download,
  LogOut, ExternalLink, Eye, EyeOff, ChevronRight, Menu, Star, RefreshCw, Upload,
  Copy, GripVertical, AlertTriangle,
} as const;

export type IconName = keyof typeof MAP;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name as IconName] ?? FileText;
  return <Cmp {...props} />;
}
