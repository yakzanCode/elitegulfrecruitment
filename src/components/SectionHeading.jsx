export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center mx-auto" : ""} style={isCenter ? { maxWidth: 640 } : undefined}>
      {eyebrow && (
        <p className={"eyebrow mb-2" + (light ? " eyebrow-light" : "")}>{eyebrow}</p>
      )}
      <h2 className="mb-0" style={{ fontSize: "1.75rem" }}>
        {title}
      </h2>
      <div className={"rule-gold mt-3" + (isCenter ? " mx-auto" : "")}></div>
      {description && (
        <p className={"mt-3 text-muted-custom" + (isCenter ? "" : "")} style={{ maxWidth: 640 }}>
          {description}
        </p>
      )}
    </div>
  );
}
