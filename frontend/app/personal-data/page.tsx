import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProtectedEmail } from '@/components/protected-email'

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных',
  description:
    'Согласие на обработку персональных данных при подаче заявки на сайте Тойота33 во Владимире. ФЗ-152.',
}

export default function PersonalDataPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background pt-[65px]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">Документы</p>
          <h1 className="mb-2 text-3xl font-black text-foreground sm:text-4xl">
            Согласие на обработку персональных данных
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Редакция от 23.07.2026. Даётся при отправке форм на сайте Тойота33.
          </p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">1. Субъект и оператор</h2>
              <p>
                Я, субъект персональных данных, свободно, своей волей и в своём интересе даю согласие
                автосервису «Тойота33» (далее — Оператор) на обработку моих персональных данных на
                условиях, изложенных ниже и в{' '}
                <Link href="/privacy" prefetch={false} className="text-primary hover:underline">
                  Политике конфиденциальности
                </Link>
                .
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Адрес Оператора: г. Владимир, ул. Промышленный проезд, 5Б</li>
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
              <h2 className="text-lg font-bold text-foreground">2. Перечень персональных данных</h2>
              <p>Согласие распространяется на следующие данные, которые я указываю в формах Сайта:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>фамилия, имя, отчество (при указании);</li>
                <li>номер телефона;</li>
                <li>иные сведения, добровольно сообщённые в тексте заявки (в том числе VIN, перечень запчастей, описание неисправности).</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">3. Цели обработки</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>связь со мной по заявке (звонок, сообщение);</li>
                <li>запись на услуги автосервиса и/или подбор и заказ запасных частей;</li>
                <li>консультирование по услугам Оператора;</li>
                <li>исполнение договорных обязательств и требований законодательства РФ.</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">4. Действия с персональными данными</h2>
              <p>
                Согласие даётся на совершение действий, предусмотренных п. 3 ч. 1 ст. 3 Федерального закона
                № 152-ФЗ, включая: сбор, запись, систематизацию, накопление, хранение, уточнение (обновление,
                изменение), извлечение, использование, передачу (предоставление, доступ) в пределах,
                необходимых для указанных целей, обезличивание, блокирование, удаление, уничтожение —
                с использованием средств автоматизации и без них.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">5. Срок действия и отзыв</h2>
              <p>
                Согласие действует с момента его предоставления (отметки в форме на Сайте и отправки заявки)
                до достижения целей обработки либо до отзыва согласия, если более длительный срок не требуется
                по закону.
              </p>
              <p>
                Отзыв согласия направляется через{' '}
                <ProtectedEmail
                  label="электронную почту"
                  className="inline text-primary hover:underline"
                />{' '}
                или сообщается по телефону{' '}
                <a href="tel:+79049555444" className="text-primary hover:underline">
                  +7 (904) 9 555 444
                </a>
                . После отзыва Оператор прекращает обработку, за исключением случаев, когда обработка может
                продолжаться без согласия на основаниях, предусмотренных законодательством РФ.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground">6. Подтверждение</h2>
              <p>
                Отмечая соответствующее поле в форме на Сайте и отправляя заявку, я подтверждаю, что ознакомлен(а)
                с текстом настоящего согласия и{' '}
                <Link href="/privacy" prefetch={false} className="text-primary hover:underline">
                  Политикой конфиденциальности
                </Link>
                , а также что указанные мной данные принадлежат мне либо я уполномочен(а) их предоставить.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
