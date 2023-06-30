import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div>
      <p className="flex justify-center items-center">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">Counter</div>
            <div class="stat-value text-center"> {props.count.value} </div>
          </div>
        </div>
      </p>
      <div className="flex gap-x-10">
        <Button
          className="btn btn-primary"
          onClick={() => (props.count.value -= 1)}
        >
          -1
        </Button>
        <Button
          className="btn btn-accent"
          onClick={() => (props.count.value += 1)}
        >
          +1
        </Button>
      </div>
    </div>
  );
}
