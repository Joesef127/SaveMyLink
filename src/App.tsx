import { useState } from 'react';
import hive_logo from './assets/images/hive_logo.png';
import LinkBox from './components/LinkBox';

export type LinkType = { id: number; href: string | undefined };

export default function App() {
  const [urls, setUrls] = useState<LinkType[]>([]);
  const [href, setHref] = useState<string | undefined>(undefined);
  const [idCounter, setIdCounter] = useState<number>(1); // Keep track of the next ID

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)' + // protocol
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // port and path
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
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
      formattedHref = `http://${formattedHref}`; // Auto-prefix with http:// if missing
    }

    if (!isValidUrl(formattedHref)) {
      alert('Please enter a valid URL.');
      return;
    }

    addNewUrl(formattedHref);
    setHref('');
  };

  const addNewUrl = (href: string | undefined) => {
    const newLink: LinkType = {
      id: idCounter,
      href,
    };
    setUrls((prevUrls) => [...prevUrls, newLink]);
    setIdCounter((prev) => prev + 1); 
    localStorage.setItem('link', JSON.stringify(newLink));
  };

  const addFromTab = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
          if (isValidUrl(currentTab.url)) {
            addNewUrl(currentTab.url);
          } else {
            alert("The current tab does not have a valid URL.");
          }
        } else {
          alert("Unable to retrieve the URL of the current tab.");
        }
      });
    } else {
      alert("Chrome APIs are not available.");
    }
  };
  

  return (
    <div className="flex items-center justify-center font-sans h-screen w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <div className="shadow-md flex justify-center items-center gap-2 py-4 bg-green-600">
            <span>
              <img src={hive_logo} alt="logo" className="w-6" />
            </span>
            <h1 className="text-2xl font-bold text-white">SaveMyLink</h1>
          </div>
          <div className="bg-white p-4 m-4 drop-shadow-lg rounded-lg border border-green-500">
            <h2 className="text-center text-2xl font-serif font-medium text-green-500">
              Save important links to re-visit later
            </h2>
            <form id="link-form" className="my-4" onSubmit={handleAddUrl}>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="link_input"
                  className="text-xl font-semibold uppercase text-gray-800"
                >
                  Url:
                </label>
                <input
                  type="text"
                  name="link_input"
                  id="link_input"
                  value={href}
                  placeholder="https://example.com"
                  className="border border-green-500 p-2 w-full rounded-lg outline-none text-gray-800 text-lg"
                  onChange={(e) => setHref(e.target.value)}
                />
              </div>
              <div className="mt-5 w-full flex gap-3">
                <button
                  form="link-form"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium w-1/2"
                >
                  Save Url
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 rounded-lg text-white font-medium w-1/2"
                  onClick={addFromTab}
                >
                  Save From Tab
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white p-4 m-4 drop-shadow-lg rounded-lg border border-green-500">
            <h2 className="text-center text-2xl font-serif font-medium text-green-500">
              Saved Links
            </h2>
            <div>
              {urls.length !== 0 ? (
                <ul className="my-4">
                  {urls.map(
                    (url) =>
                      url.href && (
                        <LinkBox key={url.id} index={url.id} href={url} />
                      )
                  )}
                </ul>
              ) : (
                <p className="my-3 text-xl text-gray-800">
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
