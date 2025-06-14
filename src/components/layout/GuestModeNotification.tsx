
import { useAccessibility } from "../AccessibilityProvider";

const GuestModeNotification = () => {
  const { t } = useAccessibility();

  return (
    <section className="bg-muted/50 border border-muted rounded-lg p-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          💡 {t("guestModeActive")}
        </h3>
        <p className="text-muted-foreground">
          {t("guestModeDescription")}
        </p>
      </div>
    </section>
  );
};

export default GuestModeNotification;
