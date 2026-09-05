@php
    $phoneDigits = preg_replace('/\D+/', '', (string) $booking->phone);
    if (strlen($phoneDigits) === 11 && str_starts_with($phoneDigits, '8')) {
        $phoneDigits = '7'.substr($phoneDigits, 1);
    }
    if (strlen($phoneDigits) === 10) {
        $phoneDigits = '7'.$phoneDigits;
    }
    $phonePretty = $booking->phone;
    if (strlen($phoneDigits) === 11 && str_starts_with($phoneDigits, '7')) {
        $phonePretty = sprintf(
            '+7 (%s) %s-%s-%s',
            substr($phoneDigits, 1, 3),
            substr($phoneDigits, 4, 3),
            substr($phoneDigits, 7, 2),
            substr($phoneDigits, 9, 2)
        );
    }
    $telHref = strlen($phoneDigits) >= 10 ? 'tel:+'.$phoneDigits : null;
@endphp
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Новая заявка — Тойота33</title>
</head>
<body style="margin:0;padding:0;background-color:#111111;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#111111;">
        <tr>
            <td align="center" style="padding:24px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#1b1b1b;border:1px solid #2a2a2a;">
                    <tr>
                        <td style="background-color:#EB0028;height:6px;font-size:0;line-height:0;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="padding:28px 32px 16px;background-color:#030303;">
                            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#EB0028;font-weight:bold;">Тойота33 · Владимир</p>
                            <h1 style="margin:0;font-size:24px;line-height:1.25;color:#eef0f0;font-weight:800;">Новая заявка с сайта</h1>
                            <p style="margin:10px 0 0;font-size:14px;color:#9a9a9a;">
                                {{ $booking->created_at?->timezone('Europe/Moscow')->format('d.m.Y в H:i') }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:8px 32px 8px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding:16px 0;border-bottom:1px solid #2a2a2a;">
                                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a8a;">Имя</p>
                                        <p style="margin:0;font-size:18px;font-weight:bold;color:#eef0f0;">{{ $booking->name }}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:16px 0;border-bottom:1px solid #2a2a2a;">
                                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a8a;">Способ связи</p>
                                        <p style="margin:0 0 8px;font-size:13px;color:#9a9a9a;">{{ $booking->contactMethodLabel() }}</p>
                                        <p style="margin:0;font-size:18px;font-weight:bold;color:#eef0f0;">
                                            @if ($booking->contact_method === 'email' && $booking->email)
                                                <a href="mailto:{{ $booking->email }}" style="color:#EB0028;text-decoration:none;">{{ $booking->email }}</a>
                                            @elseif (in_array($booking->contact_method, ['phone', 'max'], true) && $telHref)
                                                <a href="{{ $telHref }}" style="color:#EB0028;text-decoration:none;">{{ $phonePretty }}</a>
                                            @else
                                                {{ $booking->contactDisplay() }}
                                            @endif
                                        </p>
                                    </td>
                                </tr>
                                @if ($booking->service)
                                    <tr>
                                        <td style="padding:16px 0;border-bottom:1px solid #2a2a2a;">
                                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a8a;">Услуга</p>
                                            <p style="margin:0;font-size:16px;color:#eef0f0;">{{ $booking->service }}</p>
                                        </td>
                                    </tr>
                                @endif
                                @if ($booking->message)
                                    <tr>
                                        <td style="padding:16px 0;">
                                            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a8a8a;">Сообщение</p>
                                            <p style="margin:0;font-size:15px;line-height:1.55;color:#d4d4d4;white-space:pre-wrap;">{{ $booking->message }}</p>
                                        </td>
                                    </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 32px 28px;background-color:#030303;border-top:1px solid #2a2a2a;">
                            <p style="margin:0;font-size:12px;color:#8a8a8a;">
                                Заявка с сайта
                                <a href="https://toyota33.com" style="color:#EB0028;text-decoration:none;">toyota33.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
