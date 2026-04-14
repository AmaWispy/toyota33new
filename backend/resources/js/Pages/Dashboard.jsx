import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { useState, useEffect } from 'react';
import { PatternFormat } from 'react-number-format';
import axios from 'axios';

export default function Dashboard({ tab = 'chats', shouldShowCreateForm = false }) { // Accept shouldShowCreateForm
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(tab);
    const [prompt, setPrompt] = useState('');
    const [savingPrompt, setSavingPrompt] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [clients, setClients] = useState([]);
    const [loadingClients, setLoadingClients] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);

    useEffect(() => {
        fetchChats();
        fetchPrompt();
        fetchBookings();
        fetchClients();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get('/api/admin/chats');
            setChats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chats:', error);
            setLoading(false);
        }
    };

    const fetchPrompt = async () => {
        try {
            const response = await axios.get('/api/admin/prompt');
            if (response.data) {
                setPrompt(response.data.content);
            }
        } catch (error) {
            console.error('Error fetching prompt:', error);
        }
    };

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const response = await axios.get('/api/admin/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoadingBookings(false);
        }
    };

    const fetchClients = async () => {
        setLoadingClients(true);
        try {
            const response = await axios.get('/api/admin/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoadingClients(false);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            await axios.patch(`/api/admin/bookings/${id}/status`, { status });
            fetchBookings();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.patch(`/api/admin/bookings/${id}/read`);
            fetchBookings();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const updateClient = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/admin/clients/${editingClient.id}`, editingClient);
            setEditingClient(null);
            fetchClients();
        } catch (error) {
            console.error('Error updating client:', error);
            alert('Ошибка при обновлении клиента');
        }
    };

    const deleteClient = async (id) => {
        if (!confirm('Вы уверены, что хотите удалить этого клиента?')) return;
        try {
            await axios.delete(`/api/admin/clients/${id}`);
            fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const savePrompt = async () => {
        setSavingPrompt(true);
        try {
            await axios.post('/api/admin/prompt', { content: prompt });
            alert('Инструкции обновлены!');
        } catch (error) {
            console.error('Error saving prompt:', error);
            alert('Ошибка при сохранении');
        } finally {
            setSavingPrompt(false);
        }
    };

    const fetchMessages = async (sessionId) => {
        try {
            const response = await axios.get(`/api/admin/chats/${sessionId}`);
            setMessages(response.data);
            setSelectedChat(sessionId);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const navItems = (
        <>
            <NavLink 
                href={route('dashboard')}
                active={activeTab === 'chats'}
            >
                Диалоги
            </NavLink>
            <NavLink 
                href={route('bookings')}
                active={activeTab === 'bookings'}
            >
                Заявки
            </NavLink>
            <NavLink 
                href={route('clients')}
                active={activeTab === 'clients'}
            >
                Клиенты
            </NavLink>
            <NavLink 
                href={route('prompt')}
                active={activeTab === 'prompt'}
            >
                Инструкции
            </NavLink>
        </>
    );

    return (
        <AuthenticatedLayout
            extraNav={navItems}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    тойота33 — {
                        activeTab === 'chats' ? 'Диалоги' : 
                        activeTab === 'bookings' ? 'Заявки' : 
                        activeTab === 'clients' ? 'База клиентов' : 
                        'Инструкции'
                    }
                </h2>
            }
        >
            <Head title="тойота33 — Админ" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {activeTab === 'chats' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
                            {/* Список чатов */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col border border-gray-200">
                                <div className="p-4 border-b border-gray-200 bg-gray-50 font-semibold">
                                    Список диалогов
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-4 text-center text-gray-500">Загрузка...</div>
                                    ) : chats.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">Чатов пока нет</div>
                                    ) : (
                                        chats.map((chat) => (
                                            <div
                                                key={chat.session_id}
                                                onClick={() => fetchMessages(chat.session_id)}
                                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                                    selectedChat === chat.session_id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs font-mono text-gray-400 truncate w-32">
                                                        ID: {chat.session_id.substring(0, 8)}...
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">
                                                        {formatDate(chat.last_message_at)}
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    Клиент: <span className="font-normal text-gray-600">{chat.last_message}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Окно диалога */}
                            <div className="md:col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col border border-gray-200">
                                {selectedChat ? (
                                    <>
                                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                            <span className="font-semibold">Диалог {selectedChat.substring(0, 8)}...</span>
                                            <span className="text-xs text-gray-400">Всего сообщений: {messages.length}</span>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                                            {messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                                                        msg.role === 'user' 
                                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                                    }`}>
                                                        <div className="text-xs mb-1 opacity-70">
                                                            {msg.role === 'user' ? 'Пользователь' : 'Лексус'} • {formatDate(msg.created_at)}
                                                        </div>
                                                        <div className="text-sm whitespace-pre-wrap">
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-2">
                                        <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Выберите чат для просмотра истории
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 font-semibold flex justify-between items-center">
                                <span>Новые заявки с сайта</span>
                                <button onClick={fetchBookings} className="text-xs text-blue-600 hover:underline">Обновить</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Услуга</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сообщение</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loadingBookings ? (
                                            <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">Загрузка...</td></tr>
                                        ) : bookings.length === 0 ? (
                                            <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">Заявок пока нет</td></tr>
                                        ) : (
                                            bookings.map((booking) => (
                                                <tr key={booking.id} className={booking.is_read ? 'opacity-60 bg-gray-50/30' : 'bg-blue-50/20 font-medium'}>
                                                    <td className="px-6 py-4">
                                                        {!booking.is_read && (
                                                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" title="Новая непрочитанная"></div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                        {formatDate(booking.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-gray-900">{booking.name}</div>
                                                        <div className="text-sm text-blue-600 font-medium">{booking.phone}</div>
                                                        {booking.email && <div className="text-[10px] text-gray-400">{booking.email}</div>}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {booking.service || 'Не указана'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                        {booking.message}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <select 
                                                            value={booking.status} 
                                                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                                            className={`text-xs rounded-full px-3 py-1 border font-semibold outline-none ${getStatusColor(booking.status)}`}
                                                        >
                                                            <option value="new">Новая</option>
                                                            <option value="in_progress">В работе</option>
                                                            <option value="completed">Завершена</option>
                                                            <option value="cancelled">Отмена</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {!booking.is_read && (
                                                            <button 
                                                                onClick={() => markAsRead(booking.id)}
                                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md text-xs border border-blue-200"
                                                            >
                                                                Прочитано
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'clients' && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 font-semibold flex justify-between items-center">
                                <span>База клиентов</span>
                                <div className="flex gap-4 items-center">
                                    <Link href={route('clients.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold transition-colors">
                                        + Добавить клиента
                                    </Link>
                                    <button onClick={fetchClients} className="text-xs text-blue-600 hover:underline">Обновить</button>
                                </div>
                            </div>
                            
                            {/* Форма редактирования (Inline) */}
                            {editingClient && (
                                <div className="p-6 bg-blue-50 border-b border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-blue-800">Редактирование клиента</h3>
                                    <form onSubmit={updateClient} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Имя</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={editingClient.name} 
                                                onChange={e => setEditingClient({...editingClient, name: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Телефон</label>
                                            <PatternFormat
                                                required
                                                format="+7 (###) ###-##-##"
                                                mask="_"
                                                value={editingClient.phone}
                                                onValueChange={(values) => setEditingClient({...editingClient, phone: values.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Email</label>
                                            <input 
                                                type="email" 
                                                value={editingClient.email || ''} 
                                                onChange={e => setEditingClient({...editingClient, email: e.target.value})}
                                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Комментарий (Заметки)</label>
                                            <textarea 
                                                value={editingClient.comment || ''} 
                                                onChange={e => setEditingClient({...editingClient, comment: e.target.value})}
                                                rows="2"
                                                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                                            />
                                        </div>
                                        <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                                            <button 
                                                type="button" 
                                                onClick={() => setEditingClient(null)}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Отмена
                                            </button>
                                            <button 
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Сохранить изменения
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Контакты</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заметки</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Последняя активность</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loadingClients ? (
                                            <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Загрузка...</td></tr>
                                        ) : clients.length === 0 ? (
                                            <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Клиентов пока нет</td></tr>
                                        ) : (
                                            clients.map((client) => (
                                                <tr key={client.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-bold text-gray-900">{client.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-blue-600 font-medium">{client.phone}</div>
                                                        <div className="text-xs text-gray-400">{client.email || '—'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                        {client.comment || <span className="text-gray-300 italic">Нет заметок</span>}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                        {formatDate(client.updated_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3">
                                                        <button 
                                                            onClick={() => setEditingClient(client)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Редактировать
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteClient(client.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Удалить
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'prompt' && (
                        /* Редактирование промпта */
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 flex flex-col h-[700px]">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <span className="font-semibold">Инструкции для ИИ (System Prompt)</span>
                                <button 
                                    onClick={savePrompt}
                                    disabled={savingPrompt}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                                >
                                    {savingPrompt ? 'Сохранение...' : 'СОХРАНИТЬ'}
                                </button>
                            </div>
                            <div className="flex-1 p-6">
                                <textarea 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full h-full p-4 border border-gray-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Введите системный промпт здесь..."
                                    spellCheck="false"
                                    autoComplete="off"
                                    data-gramm="false"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
