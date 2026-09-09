
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`p-5 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2
      className={`text-base font-bold text-slate-900 tracking-tight font-sans ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-xs text-slate-500 mt-0.5 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-5 sm:p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`p-4 sm:p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
