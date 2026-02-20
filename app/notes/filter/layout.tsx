export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.filterContainer}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}