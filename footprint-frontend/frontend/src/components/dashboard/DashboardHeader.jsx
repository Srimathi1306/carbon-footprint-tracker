function DashboardHeader({ title, subtitle, buttonText, onButtonClick }) {
  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      <div style={styles.rightSection}>
        {buttonText && (
          <button style={styles.button} onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    marginTop: "5px",
    color: "#6b7280",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};

export default DashboardHeader;
