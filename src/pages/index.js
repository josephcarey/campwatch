import Header from "../common/components/header";
import QuickCheck from "../common/components/quick-check";

export default function Home() {
  return (
    <>
      <Header
        title="CampWatch"
        description="Reservation scraping for MN campsite reservations."
      />
      <QuickCheck />
    </>
  );
}
