import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KeyRound, LoaderCircle, LogOut } from "lucide-react";
import { checkCredentials, DEMO_ACCOUNT, selectUser, signIn, signOut } from "@/features/auth";
import { selectBookmarks } from "@/features/bookmark";
import { buttonClass, ButtonLink, SplitText } from "@/shared/ui";

const fieldClass =
  "h-12 w-full border-2 border-ink bg-canvas px-4 font-mono text-sm outline-none transition-shadow focus:shadow-hard-accent";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(false);
    const user = await checkCredentials(username, password);
    setPending(false);
    if (!user) return setError(true);
    dispatch(signIn(user));
    navigate(from, { replace: true });
  };

  const fillDemo = () => {
    setUsername(DEMO_ACCOUNT.username);
    setPassword(DEMO_ACCOUNT.password);
    setError(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide uppercase">{t("login.username")}</span>
        <input
          className={fieldClass}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          required
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wide uppercase">{t("login.password")}</span>
        <input
          className={fieldClass}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {error && (
        <p role="alert" className="page-in border-2 border-accent px-4 py-3 text-sm font-bold text-accent-text">
          {t("login.error")}
        </p>
      )}

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full disabled:opacity-70")}>
        {pending && <LoaderCircle className="size-4 animate-spin" />}
        {t("login.submit")}
      </button>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-2 border-dashed border-ink p-4">
        <div className="font-mono text-xs leading-relaxed">
          <p className="mb-1 font-bold text-muted uppercase">{t("login.demo")}</p>
          <p>
            {DEMO_ACCOUNT.username} / {DEMO_ACCOUNT.password}
          </p>
        </div>
        <button type="button" onClick={fillDemo} className={buttonClass("ghost", "h-10 text-xs")}>
          <KeyRound className="size-4" />
          {t("login.fill")}
        </button>
      </div>
    </form>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;
  const saved = useSelector(selectBookmarks).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="grid size-16 place-items-center bg-accent font-display text-3xl font-extrabold text-white uppercase">
          {user.name[0]}
        </span>
        <div>
          <p className="font-display text-xl font-bold uppercase">{user.name}</p>
          <p className="font-mono text-xs text-muted">@{user.username}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 border-2 border-ink">
        <div className="border-r-2 border-ink p-4">
          <dt className="font-mono text-[10px] font-bold text-muted uppercase">{t("login.savedCount")}</dt>
          <dd className="font-display text-3xl font-extrabold tabular-nums">{saved}</dd>
        </div>
        <div className="p-4">
          <dt className="font-mono text-[10px] font-bold text-muted uppercase">{t("login.plan")}</dt>
          <dd className="font-display text-3xl font-extrabold uppercase">Demo</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/saved" className="flex-1">
          {t("nav.saved")}
        </ButtonLink>
        <button type="button" onClick={() => dispatch(signOut())} className={buttonClass("ghost", "flex-1 whitespace-nowrap")}>
          <LogOut className="size-4" />
          {t("login.signOut")}
        </button>
      </div>
    </div>
  );
};

export const LoginPage = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <div className="shell grid gap-10 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pt-20">
      <div>
        <p className="mb-4 font-mono text-xs font-bold text-accent-text uppercase">
          {user ? t("login.signedInAs") : t("login.kicker")}
        </p>
        <h1 className="font-display text-5xl leading-[0.9] font-extrabold tracking-tight break-words uppercase sm:text-7xl">
          <SplitText key={user?.name} text={user ? user.name : t("login.title")} />
        </h1>
        <p className="page-in mt-6 max-w-md text-muted text-pretty">{user ? t("login.welcome") : t("login.desc")}</p>
      </div>

      <div className="page-in border-[3px] border-ink bg-surface p-6 shadow-hard-lg sm:p-8">
        {user ? <Profile /> : <LoginForm />}
      </div>
    </div>
  );
};
