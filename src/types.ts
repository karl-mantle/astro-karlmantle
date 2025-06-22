import type { HTMLAttributes } from 'astro/types';

export interface DefaultTypes {
  buttonPrimary?: ButtonOptions,
  buttonSecondary?: ButtonOptions,
  class?: string | null,
  date?: Date,
  dateOptions?: DateOptions,
  description?: string,
  heading?: string,
  image?: ImageOptions
};

export interface ButtonOptions extends HTMLAttributes<'a'> {
  ariaLabel?: string,
  buttonStyle?: 'primary' | 'secondary' | 'link' | 'icon' | 'disabled',
  buttonText?: string,
  buttonTextClass?: string,
  buttonTextWrap?: boolean,
  icon?: string,
  iconAnimate?: boolean,
  iconReverse?: boolean,
  iconSize?: number,
  openNewTab?: boolean
};

export interface ImageOptions {
  alt: string | null,
  src: ImageMetadata
};

export interface DateOptions extends HTMLAttributes<'div'> {
  description?: DefaultTypes['description'],
  hideDescription?: boolean,
  hideIcon?: boolean
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
  count?: number,
  name: string,
  slug: string,
  type?: string
};
