import tasks from "../tasks.json";
import remarkGfm from 'remark-gfm';
import Markdown from "react-markdown";
import "./HomeWork.css";
import logoFt from "/public/logo-ft.jpg"; // <-- adjust path if needed

export const HomeWork = () => {
  const filterDates = (tasks) => {
    // Получаем дату из URL (?date=YYYY-MM-DD)
    const searchParams = new URLSearchParams(window.location.search);
    const dateFromUrl = searchParams.get("date");

    // Если нет даты — берем сегодняшнюю
    const startDate = dateFromUrl ? new Date(dateFromUrl) : new Date();
    startDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((row, index) => {
      // Каждое задание открывается с шагом 7 дней от стартовой даты
      const openDate = new Date(startDate);
      openDate.setDate(openDate.getDate() + index * 7); // +7 дней на каждое следующее задание
      openDate.setHours(0, 0, 0, 0);

      return openDate <= today;
    });
  };

  return (
    <div className="hw-container">
      {/* Logo now part of content flow */}
      <div className="hw-logo-wrapper">
        <img src={logoFt} alt="Logo FT" className="hw-logo" />
      </div>

      <table className="hw-table">
        <thead>
        <tr>
          <th>Тема</th>
          <th>Задание</th>
        </tr>
        </thead>
        <tbody>
        {filterDates(tasks.tasks).map((row, index) => (
          <tr key={index}>
            <td className="hw-title">{row.title}</td>
            <td className="hw-job">
              <div className="hw-scroll">
                <Markdown remarkPlugins={[remarkGfm]}>{row.job}</Markdown>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
