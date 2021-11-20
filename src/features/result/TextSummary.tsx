type TextSummaryProps = {
  text: string;
};

export default function TextSummary({ text }: TextSummaryProps) {
  return (
    <div>
      <div className="text-lg font-medium pt-2 pb-2">Text Summary</div>
      <pre>{text}</pre>
    </div>
  );
}
