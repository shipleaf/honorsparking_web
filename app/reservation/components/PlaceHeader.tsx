"use client";

import PageHeader from "@/app/components/ui/PageHeader";

interface Props {
  setIsDetailPageOpen: (open: boolean) => void;
  zoneName: string;
}

export default function PlaceHeader({ setIsDetailPageOpen, zoneName }: Props) {
  return (
    <PageHeader
      title={zoneName}
      onBack={() => setIsDetailPageOpen(false)}
    />
  );
}
