import { LinkType } from 'App';

export default function LinkBox({
  index,
  href,
}: {
  index: number;
  href: LinkType;
}) {
  return (
    <div className="my-2 px-2 py-1 rounded bg-gray-100">
      <li className="text-lg list-none text-green-600 hover:underline">
        <a href={href.href} target="_blank" rel="noreferrer">
          {index}. {href.href}
        </a>
      </li>
    </div>
  );
}
