
import { useAccessibility } from "../AccessibilityProvider";
import { useAuth } from "../AuthProvider";

const WelcomeSection = () => {
  const { t } = useAccessibility();
  const { isGuest } = useAuth();

  return (
    <section className="text-center space-y-4" aria-labelledby="welcome-heading">
      <h2 id="welcome-heading" className="text-3xl font-bold text-foreground">
        {isGuest ? t("welcomeGuestTitle") : t("welcomeTitle")}
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {isGuest ? t("welcomeGuestDescription") : t("welcomeDescription")}
      </p>
    </section>
  );
};

export default WelcomeSection;
