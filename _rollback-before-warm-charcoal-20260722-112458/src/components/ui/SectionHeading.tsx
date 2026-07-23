type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeading({ title, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </div>
  );
}
