import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { PatternFormat } from 'react-number-format';
import axios from 'axios';

export default function CreateClient() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        comment: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/api/admin/clients', {
            onSuccess: () => {
                // Since it's an API call via axios usually, but Inertia post works too
                // For simplicity with your setup, I'll use window.location if needed
                // But Inertia is better.
            },
        });
    };

    // Standard Inertia redirect after success would happen from controller, 
    // but ClientController returns JSON. Let's make it work nicely.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/clients', data);
            window.location.href = route('clients');
        } catch (error) {
            alert('Ошибка при создании клиента. Возможно номер телефона уже есть в базе.');
        }
    };

    const navItems = (
        <>
            <NavLink href={route('dashboard')}>Диалоги</NavLink>
            <NavLink href={route('bookings')}>Заявки</NavLink>
            <NavLink href={route('clients')} active={true}>Клиенты</NavLink>
            <NavLink href={route('prompt')}>Инструкции</NavLink>
        </>
    );

    return (
        <AuthenticatedLayout
            extraNav={navItems}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Добавление нового клиента
                </h2>
            }
        >
            <Head title="Новый клиент" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase mb-2">ФИО клиента *</label>
                                <input 
                                    required
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Напр: Иванов Иван Иванович"
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Телефон *</label>
                                    <PatternFormat
                                        required
                                        format="+7 (###) ###-##-##"
                                        mask="_"
                                        value={data.phone}
                                        onValueChange={(values) => setData('phone', values.value)}
                                        placeholder="+7 (___) ___-__-__"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="client@mail.ru"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Внутренний комментарий</label>
                                <textarea 
                                    value={data.comment} 
                                    onChange={e => setData('comment', e.target.value)}
                                    rows="4"
                                    placeholder="Любая важная информация о клиенте..."
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <Link 
                                    href={route('clients')}
                                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    Отмена
                                </Link>
                                <button 
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all"
                                >
                                    Создать клиента
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
