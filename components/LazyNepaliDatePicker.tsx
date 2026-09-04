import dynamic from "next/dynamic";

const LazyNepaliDatepicker = dynamic(() => import("@/components/DatePicker"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-40 animate-pulse bg-muted rounded-md" />
  ),
});

export default LazyNepaliDatepicker;
