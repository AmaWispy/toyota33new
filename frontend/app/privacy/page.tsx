import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProtectedEmail } from '@/components/protected-email'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика конфиденциальности автосервиса Тойота33 во Владимире в соответствии с ФЗ-152 «О персональных данных».',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background pt-[65px]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">Документы</p>
          <h1 className="mb-2 text-3xl font-black text-foreground sm:text-4xl">
            Политика конфиденциальности
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Редакция от 23.07.2026. Действует в отношении сайта Тойота33.
          </p>

          <div className="prose-legal flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных
                данных пользователей сайта автосервиса «Тойота33» (далее — Оператор, Сайт) в соответствии с
                Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
              <p>
                Используя Сайт и оставляя заявки, вы подтверждаете согласие с условиями настоящей Политики.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">2. Оператор персональных данных</h2>
              <p>Оператор: автосервис «Тойота33».</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Адрес: г. Владимир, ул. Промышленный проезд, 5Б</li>
                <li>
                  Телефон:{' '}
                  <a href="tel:+79049555444" className="text-primary hover:underline">
                    +7 (904) 9 555 444
                  </a>
                </li>
                <li>
                  Email:{' '}
                  <ProtectedEmail
                    label="написать письмо"
                    className="inline text-primary hover:underline"
                  />
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">3. Какие данные мы обрабатываем</h2>
              <p>В зависимости от взаимодействия с Сайтом могут обрабатываться:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>имя;</li>
                <li>номер телефона, email или иной указанный способ связи;</li>
                <li>сведения из текста заявки (описание работ, VIN, перечень запчастей и т.п.);</li>
                <li>технические данные (IP-адрес, сведения о браузере, дата и время обращения) — в объёме, необходимом для работы Сайта и защиты от злоупотреблений;</li>
                <li>данные Яндекс.Метрики (cookie, идентификатор посетителя, сведения о просмотрах страниц) — для учёта посещаемости;</li>
                <li>
                  технические данные Yandex SmartCaptcha (отпечаток браузера, token и сведения об устройстве) — для
                  защиты форм от спама; условия обработки:{' '}
                  <a
                    href="https://yandex.ru/legal/smartcaptcha_notice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    yandex.ru/legal/smartcaptcha_notice
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">4. Цели обработки</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>обработка заявок на запись, консультацию и заказ запчастей;</li>
                <li>обратная связь с пользователем;</li>
                <li>оказание услуг автосервиса;</li>
                <li>исполнение требований законодательства РФ;</li>
                <li>улучшение работы Сайта и защита от спама и мошенничества.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">5. Правовые основания</h2>
              <p>
                Обработка осуществляется на основании согласия субъекта персональных данных, а также в случаях,
                когда это необходимо для исполнения договора (в том числе договора-оферты на оказание услуг) и
                исполнения обязанностей, возложенных на Оператора законодательством.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">6. Условия обработки и передачи</h2>
              <p>
                Персональные данные не продаются и не передаются третьим лицам, за исключением случаев:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>получения вашего согласия;</li>
                <li>требования законодательства или уполномоченных органов;</li>
                <li>
                  привлечения подрядчиков (хостинг, почтовые и коммуникационные сервисы), действующих по
                  поручению Оператора и обязанных соблюдать конфиденциальность.
                </li>
              </ul>
              <p>
                Обработка осуществляется с применением организационных и технических мер защиты, достаточных для
                предотвращения несанкционированного доступа.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">7. Сроки хранения</h2>
              <p>
                Данные хранятся не дольше, чем этого требуют цели обработки, либо до отзыва согласия, если иное
                не предусмотрено законодательством РФ.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">8. Права субъекта персональных данных</h2>
              <p>Вы вправе:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>получить сведения об обработке своих персональных данных;</li>
                <li>требовать уточнения, блокирования или уничтожения данных;</li>
                <li>отозвать согласие на обработку;</li>
                <li>обжаловать действия Оператора в Роскомнадзор или в суд.</li>
              </ul>
              <p>
                Для реализации прав направьте запрос через{' '}
                <ProtectedEmail
                  label="электронную почту"
                  className="inline text-primary hover:underline"
                />{' '}
                или по телефону{' '}
                <a href="tel:+79049555444" className="text-primary hover:underline">
                  +7 (904) 9 555 444
                </a>
                .
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">9. Файлы cookie и аналитика</h2>
              <p>
                Сайт использует Яндекс.Метрику (счётчик 67034833), Yandex SmartCaptcha и технические cookie для учёта
                посещаемости, вебвизора и защиты форм от спама. Вы можете ограничить cookie в настройках
                браузера; часть функций Сайта при этом может работать ограниченно. Политика Яндекса:{' '}
                <a
                  href="https://yandex.ru/legal/confidential/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  yandex.ru/legal/confidential
                </a>
                . Уведомление SmartCaptcha:{' '}
                <a
                  href="https://yandex.ru/legal/smartcaptcha_notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  yandex.ru/legal/smartcaptcha_notice
                </a>
                .
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">10. Изменение Политики</h2>
              <p>
                Оператор вправе обновлять настоящую Политику. Актуальная версия всегда доступна на этой странице.
                Продолжение использования Сайта после публикации изменений означает принятие обновлённой Политики,
                если иное не предусмотрено законом.
              </p>
            </section>

            <p className="border-t border-border pt-6">
              Также см.{' '}
              <Link href="/personal-data" prefetch={false} className="text-primary hover:underline">
                Согласие на обработку персональных данных
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
