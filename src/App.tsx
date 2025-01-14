import { useEffect, useState } from 'react';
import hive_logo from './assets/images/hive_logo.png';
import LinkBox from './components/LinkBox';

export type LinkType = { id: number; href: string | undefined };

export default function App() {
  const [href, setHref] = useState<string | undefined>(undefined);
  const [urls, setUrls] = useState<LinkType[]>(() => {
  const savedLinks = localStorage.getItem('links');
  return savedLinks ? JSON.parse(savedLinks) : [];
});

const [idCounter, setIdCounter] = useState<number>(() => {
  const savedLinks = localStorage.getItem('links');
  const parsedLinks: LinkType[] = savedLinks ? JSON.parse(savedLinks) : [];

  const maxId = parsedLinks.reduce((max, link) => Math.max(max, link.id), 0);
  return maxId + 1;
});


  useEffect(() => {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) {
      setUrls(JSON.parse(savedLinks));
    }
  }, []);

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)' +
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' +
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' +
        '(\\#[-a-zA-Z\\d_]*)?$',
      'i'
    );
    return pattern.test(url);
  };

  const handleAddUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!href) {
      alert('Please enter a URL.');
      return;
    }

    let formattedHref = href.trim();
    if (
      !formattedHref.startsWith('http://') &&
      !formattedHref.startsWith('https://')
    ) {
      formattedHref = `http://${formattedHref}`; 
    }

    if (!isValidUrl(formattedHref)) {
      alert('Please enter a valid URL.');
      return;
    }

    addNewUrl(formattedHref);
    setHref('');
  };

  const addNewUrl = (href: string | undefined) => {
    const newLink: LinkType = { id: idCounter, href };
    const updatedUrls = [...urls, newLink];
    localStorage.setItem('links', JSON.stringify(updatedUrls));
    setUrls(updatedUrls);
    setIdCounter((prev) => prev + 1);
  };

  const addFromTab = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
          if (isValidUrl(currentTab.url)) {
            addNewUrl(currentTab.url);
          } else {
            alert('The current tab does not have a valid URL.');
          }
        } else {
          alert('Unable to retrieve the URL of the current tab.');
        }
      });
    } else {
      alert('Chrome APIs are not available.');
    }
  };

  const deleteUrl = (id: number) => {
  const updatedUrls = urls.filter((url) => url.id !== id);
  localStorage.setItem('links', JSON.stringify(updatedUrls));
  setUrls(updatedUrls);
};


  const clearAllUrls = () => {
    localStorage.removeItem('links');
    setUrls([]);
  };

  return (
    <div className="flex items-center justify-center font-sans h-screen w-[520px] bg-white rounded-lg">
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className="shadow-md flex justify-center items-center gap-2 py-4 bg-green-600">
            <span>
              <img src={hive_logo} alt="logo" className="w-6" />
            </span>
            <h1 className="text-2xl font-bold text-white">SaveMyLink</h1>
          </div>
          <div className="bg-white p-2 m-4 drop-shadow-lg rounded-lg border border-green-500">
            <h2 className="text-center text-lg font-serif font-medium text-green-500">
              Save important links to re-visit later
            </h2>
            <form id="link-form" className="my-2" onSubmit={handleAddUrl}>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="link_input"
                  className="text-base font-semibold uppercase text-gray-800"
                >
                  Url:
                </label>
                <input
                  type="text"
                  name="link_input"
                  id="link_input"
                  value={href}
                  placeholder="https://example.com"
                  className="border border-green-500 p-2 w-full rounded-lg outline-none text-gray-800 text-base"
                  onChange={(e) => setHref(e.target.value)}
                />
              </div>
              <div className="mt-5 w-full flex gap-3">
                <button
                  form="link-form"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium w-1/2 text-base"
                >
                  Save Url
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium w-1/2 text-base"
                  onClick={addFromTab}
                >
                  Save From Tab
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium w-1/2 text-base"
                  onClick={clearAllUrls}
                >
                  Clear All Links
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white p-4 m-4 drop-shadow-lg rounded-lg border border-green-500">
            <h2 className="text-center text-lg font-serif font-medium text-green-500">
              Saved Links
            </h2>
            <div>
              {urls.length !== 0 ? (
                <ul className="my-4">
                  {urls.map(
                    (url) =>
                      url.href && (
                        <LinkBox
                          key={url.id}
                          index={url.id}
                          href={url}
                          onDelete={() => deleteUrl(url.id)}
                        />
                      )
                  )}
                </ul>
              ) : (
                <p className="my-3 text-base text-gray-800 ">
                  There are no saved URLs
                </p>
              )}
            </div>
          </div>
        </div>
        <footer className="mt-4 w-full text-center text-green-800">
          <p className="text-xs">Created by yorubamerlin &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}
