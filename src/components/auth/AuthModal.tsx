import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { login, signup, loginWithGoogleDemo, resetPassword, isLoading } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      if (!email || !password) {
        setError('Please enter your email and password');
        return;
      }
      try {
        await login(email, password);
        onClose();
      } catch {
        setError('Invalid credentials');
      }
    } else if (mode === 'signup') {
      if (!name || !email || !password) {
        setError('Please fill in all required fields');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      try {
        await signup(name, email, password);
        onClose();
      } catch {
        setError('Failed to create account');
      }
    } else if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      await resetPassword(email);
      setResetSent(true);
    }
  };

  const handleGoogleDemo = async () => {
    await loginWithGoogleDemo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="auth-modal-card"
        className="w-full max-w-md bg-[#0b0d18] border border-[#1a1e2d] glass-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <button
          id="auth-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#111424] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo / Header */}
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#3d5afe] flex items-center justify-center text-white font-bold shadow-md shadow-[#3d5afe]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="serif-display font-bold text-base text-white tracking-tight">AI Atlas</h3>
            <p className="text-xs text-gray-400">Master AI without drowning in information.</p>
          </div>
        </div>

        {resetSent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="serif-display font-bold text-white text-lg">Reset Link Dispatched</h4>
            <p className="text-xs text-gray-400 mt-1.5 mb-6">
              We sent a secure password reset link to <span className="text-gray-200 font-mono">{email}</span>.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                setMode('signin');
              }}
              className="w-full py-2.5 bg-[#080a14] hover:bg-[#111424] text-white text-xs font-semibold rounded-xl border border-[#1a1e2d] transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="serif-display text-xl font-bold text-white">
                {mode === 'signin' && 'Sign in to AI Atlas'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'forgot' && 'Reset your password'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {mode === 'signin' && 'Welcome back. Pick up right where you left off.'}
                {mode === 'signup' && 'Join thousands mastering modern AI concepts.'}
                {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Quick Demo Google Login */}
            {mode !== 'forgot' && (
              <div className="mb-4">
                <button
                  id="auth-google-btn"
                  onClick={handleGoogleDemo}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#080a14] hover:bg-[#111424] border border-[#1a1e2d] text-gray-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1a1e2d]" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#0b0d18] px-2 text-gray-500 font-semibold tracking-wider">
                      Or with email
                    </span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="auth-input-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe] focus:ring-1 focus:ring-[#3d5afe]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    id="auth-input-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe] focus:ring-1 focus:ring-[#3d5afe]"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-300">Password</label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-[#3d5afe] hover:text-[#536dfe]"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="auth-input-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe] focus:ring-1 focus:ring-[#3d5afe]"
                    />
                  </div>
                </div>
              )}

              <button
                id="auth-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-lg shadow-[#3d5afe]/25"
              >
                <span>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Instructions'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-400">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    id="switch-to-signup"
                    onClick={() => setMode('signup')}
                    className="text-[#3d5afe] hover:underline font-semibold"
                  >
                    Sign up
                  </button>
                </>
              ) : mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    id="switch-to-signin"
                    onClick={() => setMode('signin')}
                    className="text-[#3d5afe] hover:underline font-semibold"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setMode('signin')}
                  className="text-[#3d5afe] hover:underline font-semibold"
                >
                  Back to Sign In
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
