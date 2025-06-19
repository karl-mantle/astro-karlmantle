import type { HTMLAttributes } from 'astro/types';

export interface DefaultTypes {
  altText?: string,
  buttonPrimary?: ButtonOptions,
  buttonSecondary?: ButtonOptions,
  class?: string | null | undefined,
  date?: Date,
  dateOptions?: DateOptions,
  description?: string,
  heading?: string,
  image?: any // ImageOptions
};

export interface ButtonOptions extends HTMLAttributes<'a'> {
  buttonStyle?: 'primary' | 'secondary' | 'link' | 'icon' | 'disabled',
  buttonText?: string,
  buttonTextClass?: string,
  buttonTextWrap?: boolean,
  icon?: string,
  iconAnimate?: boolean,
  iconReverse?: boolean,
  iconSize?: number,
  openNewTab?: boolean,
  ariaLabel?: string
};

export interface ImageOptions {
  src: ImageMetadata,
  alt?: string
};

export interface DateOptions extends HTMLAttributes<'div'> {
  description?: DefaultTypes['description'],
  hideDescription?: boolean,
  hideIcon?: boolean,
  showTime?: boolean
};

export interface LoadingOptions {
  loadLeaflet: boolean,
  loadTurnstile: boolean
};

export interface MapOptions {
  attribution?: string,
  caption?: string,
  latitude: number,
  longitude: number,
  tileLayer: string,
  zoom: number
};

export type Terms = {
  name: string,
  slug: string,
  type?: string,
  count?: number
};
