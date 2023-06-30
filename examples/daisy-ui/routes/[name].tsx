import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <div className="text-3xl">
      Hello <span className="font-bold text-6xl">{props.params.name}</span>
    </div>
  );
}
