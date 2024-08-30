// type ButtonProps = {
//   children: string;
// };

interface ButtonProps {
  children: string;
}
export const Button = ({ children }: ButtonProps) => (
  <button>{children}</button>
);
