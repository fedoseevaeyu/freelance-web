import { Container } from "@mantine/core";

export default function Page() {
  return (
    <Container className="pt-[24px]">
      <h1 className="font-bold mb-[12px]">Пользовательское соглашение</h1>

      <p className="text-gray-400 mb-[24px]">Последнее обновление: 10 Марта, 2023</p>

      <p className="mb-[12px]">
        Пожалуйста, внимательно прочитайте это пользовательское соглашение («Пользовательское соглашение»), чтобы
        пользоваться платформой freelance.com («freelance.com», «Мы», «Нас», «Наш»). Заходя на https://freelance.com или
        любой другой связанный(е) сайт(ы), приложения, услуги и товары, или любой другой управляемый нами веб-сайт,
        который ссылается на это соглашение (каждый из них именуется «Сайт»), вы признаете, что вы прочитали и поняли
        настоящее Соглашение.
      </p>

      <p>
        Настоящее Соглашение может время от времени меняться; любые изменения, которые мы вносим в соглашение, будут
        опубликованы на этом Сайте, мы также предпримем любые другие шаги в объеме, требуемом применимым
        законодательством, включая уведомление о существенных изменениях. Изменения в этом соглашении вступают в силу с
        указанной даты «Последнее обновление». Мы рекомендуем вам периодически проверять Соглашение на предмет любых
        изменений или обновлений.
      </p>
    </Container>
  );
}
