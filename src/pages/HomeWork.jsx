import tasks from "../tasks.json";
import remarkGfm from 'remark-gfm';
import Markdown from "react-markdown";
import "./HomeWork.css";

export const HomeWork = () => {
  const filterDates = (tasks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Фильтруем строки по дате открытия
    return tasks.filter(row => {
      // Предполагаем, что row.openDate — это строка даты в формате 'YYYY-MM-DD' или Date-объект
      const openDate = new Date(row.dateOpen);
      openDate.setHours(0, 0, 0, 0);

      // Возвращаем только те строки, где дата открытия меньше или равна сегодняшней дате

      console.log('openDate', openDate)
      console.log('today', today)
      return openDate <= today;
    });
  }

  return (
    <div className="hw-container">
      <table className="hw-table">
        <thead>
        <tr>
          <th>Тема</th>
          <th>Задание</th>
          <th>Дата открытия</th>
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
            <td className="hw-date">{row.dateOpen}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
