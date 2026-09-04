Новая заявка с сайта Тойота33
{{ $booking->created_at?->timezone('Europe/Moscow')->format('d.m.Y H:i') }}

Имя: {{ $booking->name }}
Телефон: {{ $booking->phone }}
@if ($booking->email)
Email: {{ $booking->email }}
@endif
@if ($booking->service)
Услуга: {{ $booking->service }}
@endif
@if ($booking->message)

Сообщение:
{{ $booking->message }}
@endif

toyota33.com
