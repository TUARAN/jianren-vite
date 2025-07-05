import { useState, useEffect } from 'react'
import './App.css'

interface Message {
  id: number
  content: string
  timestamp: string
  created: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: string; show: boolean }>({
    message: '',
    type: 'info',
    show: false
  })

  // 加载消息
  useEffect(() => {
    loadMessages()
  }, [])

  // 加载本地存储的消息
  const loadMessages = () => {
    try {
      const saved = localStorage.getItem('jianrenMessages')
      if (saved) {
        const parsedMessages = JSON.parse(saved)
        setMessages(parsedMessages)
      } else {
        // 添加示例数据
        const sampleMessages: Message[] = [
          {
            id: Date.now() - 300000,
            content: "有时候觉得自己矫情得像个诗人，明明只是想吃个冰淇淋，却要感叹人生苦短。",
            timestamp: new Date(Date.now() - 300000).toISOString(),
            created: new Date(Date.now() - 300000).toISOString()
          },
          {
            id: Date.now() - 600000,
            content: "下雨天总是特别容易矫情，看着窗外的雨滴，仿佛每一滴都在诉说着心事。",
            timestamp: new Date(Date.now() - 600000).toISOString(),
            created: new Date(Date.now() - 600000).toISOString()
          }
        ]
        setMessages(sampleMessages)
        saveMessages(sampleMessages)
      }
    } catch (error) {
      console.error('加载失败:', error)
      showNotification('加载历史记录失败', 'error')
    }
  }

  // 保存消息到本地存储
  const saveMessages = (messagesToSave: Message[]) => {
    try {
      localStorage.setItem('jianrenMessages', JSON.stringify(messagesToSave))
    } catch (error) {
      console.error('保存失败:', error)
      showNotification('保存失败，请检查浏览器存储空间', 'error')
    }
  }

  // 显示通知
  const showNotification = (message: string, type: string = 'info') => {
    setNotification({ message, type, show: true })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  // 处理发布
  const handlePublish = () => {
    const content = inputValue.trim()
    
    if (!content) {
      showNotification('请输入一些内容...', 'warning')
      return
    }
    
    if (editingId !== null) {
      // 编辑模式
      const updatedMessages = messages.map(msg => 
        msg.id === editingId 
          ? { ...msg, content, timestamp: new Date().toISOString() }
          : msg
      )
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      setEditingId(null)
      showNotification('矫情语录更新成功！', 'success')
    } else {
      // 新建模式
      const newMessage: Message = {
        id: Date.now(),
        content: content,
        timestamp: new Date().toISOString(),
        created: new Date().toISOString()
      }
      
      const updatedMessages = [newMessage, ...messages]
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      showNotification('矫情语录发布成功！', 'success')
    }
    
    setInputValue('')
  }

  // 开始编辑
  const startEdit = (id: number) => {
    const message = messages.find(msg => msg.id === id)
    if (message) {
      setEditingId(id)
      setInputValue(message.content)
      showNotification('正在编辑...', 'info')
    }
  }

  // 删除消息
  const deleteMessage = (id: number) => {
    if (confirm('确定要删除这条矫情语录吗？')) {
      const updatedMessages = messages.filter(msg => msg.id !== id)
      setMessages(updatedMessages)
      saveMessages(updatedMessages)
      showNotification('矫情语录已删除', 'info')
    }
  }

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handlePublish()
    }
    if (e.key === 'Escape' && editingId !== null) {
      setEditingId(null)
      setInputValue('')
      showNotification('已取消编辑', 'info')
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">贱人就是矫情</h1>
        <p className="subtitle">记录那些矫情的瞬间</p>
      </header>

      <main className="main">
        <div className="input-section">
          <div className="input-container">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="写下你的矫情语录..."
              className="message-input"
            />
            <button onClick={handlePublish} className="publish-btn">
              <span className="btn-text">
                {editingId !== null ? '更新' : '发布'}
              </span>
              <span className="btn-icon">
                {editingId !== null ? '✏️' : '✨'}
              </span>
            </button>
          </div>
        </div>

        <div className="messages-section">
          <h2 className="section-title">矫情语录</h2>
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💭</div>
                <div className="empty-state-text">还没有矫情语录，快来发布第一条吧！</div>
              </div>
            ) : (
              messages.map(message => (
                <div key={message.id} className="message-card">
                  <div className="message-content">{message.content}</div>
                  <div className="message-meta">
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                    <div className="message-actions">
                      <button 
                        className="action-btn edit-btn" 
                        onClick={() => startEdit(message.id)}
                        title="编辑"
                      >
                        ✏️ 编辑
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => deleteMessage(message.id)}
                        title="删除"
                      >
                        🗑️ 删除
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 贱人就是矫情 - 记录生活中的矫情时刻</p>
      </footer>

      {notification.show && (
        <div className={`notification show ${notification.type}`}>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}

export default App
