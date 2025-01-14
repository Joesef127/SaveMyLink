import { LinkType } from 'App';

export default function LinkBox(
  {
    index,
    href,
    onDelete,
  }: {
    index: number;
    href: LinkType;
    onDelete: () => void;
  },
) {
  return (
    <div className="my-2 px-2 py-1 rounded bg-gray-100 w-full flex flex-wrap gap-1">
      <li className="text-base list-none text-green-600 w-full flex gap-1 pr-7">
        <span>{index}. </span>
        <a
          href={href.href}
          target="_blank"
          rel="noreferrer"
          className="break-words w-full block hover:underline"
        >
          {href.href}
        </a>
      </li>
      <button
        onClick={onDelete}
        className="text-red-500 font-semibold text-sm px-2 py-1 rounded hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  );
}
