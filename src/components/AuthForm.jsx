import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { supabase } from '../lib/supabaseClient'

export default function AuthForm({ open, onOpenChange }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function resetForm() {
    setEmail('')
    setPassword('')
    setErrorMessage('')
    setSubmitting(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const { error } =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setSubmitting(false)
      setErrorMessage(error.message)
      return
    }

    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm()
        onOpenChange(isOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'signup' ? '회원가입' : '로그인'}</DialogTitle>
          <DialogDescription>
            {mode === 'signup' ? '이메일과 비밀번호로 가입해요.' : '이메일과 비밀번호로 로그인해요.'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="auth-email">이메일</Label>
            <Input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="auth-password">비밀번호</Label>
            <Input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <DialogFooter className="sm:justify-between">
            <button
              type="button"
              className="text-sm text-slate-500 underline"
              onClick={() => {
                setMode(mode === 'signup' ? 'login' : 'signup')
                setErrorMessage('')
              }}
            >
              {mode === 'signup' ? '이미 계정이 있어요' : '계정이 없어요'}
            </button>
            <Button type="submit" disabled={submitting}>
              {mode === 'signup' ? '가입하기' : '로그인'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
