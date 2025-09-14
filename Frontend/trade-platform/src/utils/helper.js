import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const addThousandSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const formatted = Number(num).toFixed(2);

  const [integerPart, fractionalPart] = formatted.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i=0; i<Math.min(words.lentght,2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const prepareInvestmentLineChartData = (rows = []) => {
  if (!Array.isArray(rows)) rows = [];

  // sort by actual time
  const sorted = [...rows].sort((a, b) => new Date(a.date) - new Date(b.date));

  // bucket by date (YYYY-MM-DD)
  const byDate = new Map();
  const symbols = new Set();

  for (const item of sorted) {
    const d = item?.date ? moment(item.date) : null;
    if (!d || !d.isValid()) continue;

    const key = d.format("YYYY-MM-DD");
    const sym = (item?.symbol || "").toUpperCase().trim();
    const amt = Number(item?.amount) || 0;
    if (!sym) continue;

    symbols.add(sym);

    if (!byDate.has(key)) {
      byDate.set(key, {
        dateISO: key,
        month: d.format("Do MMM"),
      });
    }
    const entry = byDate.get(key);
    entry[sym] = (entry[sym] || 0) + amt; // sum if multiple same-day txns
  }

  // produce sorted array
  const data = Array.from(byDate.values()).sort(
    (a, b) => new Date(a.dateISO) - new Date(b.dateISO)
  );

  return { data, seriesKeys: Array.from(symbols) };
};