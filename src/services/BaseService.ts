/** Import axios */
import axios from 'axios';

export class BaseService {
  /** The global instance of axios httpclient */
  protected httpClient: any;
  /** The global base url */
  protected baseUrl!: string;

  /**
   * Creates a new BaseService
   * @param baseUrl The base url for this serivce. If a valid value is not passed, the settings 'DefaultServicseBaseUrl' will be used
   */
  constructor(baseUrl?: string) {

    if (baseUrl)
      this.baseUrl = baseUrl;
    else
      this.baseUrl = process.env.VUE_APP_SERVICE_BASE_URL;

    // Initialize httpclient
    this.initializeHttpClient();
  }

  /**
   * Perform a get call to the global instance of HttpClient with the baseUrl
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param logException A boolean indicating if this call should log any eventual exception to the server. Default true
   */
  protected fetchGet<T>(url: string, logException = true): Promise<T> {
    return this.fetch<T>(url, 'get', null, logException);
  }

  /**
   * Perform a post call to the global instance of HttpClient with the baseUrl
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param logException A boolean indicating if this call should log any eventual exception to the server. Default true
   */
  protected fetchPost<T>(url: string, data?: any, logException = true): Promise<T> {
    return this.fetch<T>(url, 'post', data, logException);
  }

  /**
   * Perform a put call to the global instance of HttpClient with the baseUrl
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param logException A boolean indicating if this call should log any eventual exception to the server. Default true
   */
  protected fetchPut<T>(url: string, data?: any, logException = true): Promise<T> {
    return this.fetch<T>(url, 'put', data, logException);
  }

  /**
   * Perform a delete call to the global instance of HttpClient with the baseUrl
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param logException A boolean indicating if this call should log any eventual exception to the server. Default true
   */
  protected fetchDelete<T>(url: string, logException = true): Promise<T> {
    return this.fetch<T>(url, 'delete', null, logException);
  }

  /**
   * Perform a fetch call to the global instance of HttpClient without the baseUrl
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param method The verb to use in the request (eg. post, delete, ...)
   * @param data The data of the body request
   */
  protected fetchWithoutBaseUrl<T>(url: string, method = 'GET', data?: any): Promise<T> {
    if (this.httpClient)
      return this.httpClient({
        method,
        url,
        data
      })
        .then((response: any) => response.json());
    else
      return Promise.reject('[BaseService] The HttpClient is not injected!');
  }

  /**
   * Perform a fetch call to the global instance of HttpClient with the baseUrl.
   * If an exception is thrown this method returns null.
   * @param url The url to fetch (in addiction to the baseUrl)
   * @param method The verb to use in the request (eg. post, delete, ...)
   * @param data The data of the body request
   * @param logException A boolean indicating if this call should log any eventual exception to the server. Default true
   */
  private fetch<T>(url: string, method = 'GET', data?: any, logException = true): Promise<T> {
    this.initializeHttpClient();

    if (this.httpClient) {
      // Do the call
      return this.httpClient({
        method,
        url,
        data
      })
        .then((response: any) => {
          // if there is a result
          if (response) {
            // successful
            if (response.status === 200)
              return response.data;

            // Error state and some content
            // if (logException && response.status !== 204)
            //   this.createGenericNotification();
            // this.logException(response, url, method, data);
            else {
              // if (data)
              //   console.log(`[BaseService.fetch()] Error fetching [${method.toUpperCase()}] ${url} with data`, data);
              // else
              //   console.log(`[BaseService.fetch()] Error fetching [${method.toUpperCase()}] ${url}`);
            }
          }
          return null;
        })
        .catch(() => {
          // if (logException)
          //   this.createGenericNotification();

          // this.logException(ex, url, method, data)
        });
    } else
      return Promise.reject('[BaseService] The HttpClient is not injected!');
  }

  /**
   * Initialize axios httpclient
   */
  private initializeHttpClient() {
    if (!this.httpClient) {
      this.httpClient = axios.create({
        baseURL: this.baseUrl,
        withCredentials: false,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'msa-culture': 'it',
          'msa-token': ''
        }
      });
    }
  }
}
