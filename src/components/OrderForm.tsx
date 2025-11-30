"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function OrderForm({ product }: { product: Product }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [quantity, setQuantity] = useState(product.unit === 'kg' ? product.minWeight || 1 : product.quantities?.[0] || 1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [date, setDate] = useState<Date>();
  const [captcha, setCaptcha] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (product.unit === 'kg') {
      setTotalPrice(product.price * quantity);
    } else {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product.price, product.unit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captcha) {
      toast({ title: 'Ошибка', description: 'Пожалуйста, подтвердите, что вы не робот.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: 'Заказ принят!', description: `Спасибо, ${name}! Я скоро свяжусь с вами для подтверждения.` });
      // Reset form could be added here
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-headline text-2xl mb-4">Оформить заказ</h3>
        <p className="text-3xl font-bold text-primary">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </p>
      </div>

      {product.unit === 'kg' && (
        <div className="space-y-3">
          <Label htmlFor="weight">Вес: {quantity} кг</Label>
          <Slider
            id="weight"
            min={product.minWeight || 0.5}
            max={product.maxWeight || 5}
            step={product.weightStep || 0.5}
            value={[quantity]}
            onValueChange={(value) => setQuantity(value[0])}
          />
        </div>
      )}

      {product.unit === 'item' && product.quantities && (
        <div className="space-y-2">
          <Label htmlFor="quantity">Количество</Label>
          <Select onValueChange={(value) => setQuantity(Number(value))} defaultValue={String(quantity)}>
            <SelectTrigger id="quantity">
              <SelectValue placeholder="Выберите количество" />
            </SelectTrigger>
            <SelectContent>
              {product.quantities.map(q => (
                <SelectItem key={q} value={String(q)}>{q} шт.</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ваше имя</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>

      <div className="space-y-3">
        <Label>Способ получения</Label>
        <RadioGroup value={deliveryType} onValueChange={(value: 'pickup' | 'delivery') => setDeliveryType(value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup">Самовывоз</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery">Доставка</Label>
          </div>
        </RadioGroup>
      </div>

      {deliveryType === 'delivery' && (
        <div className="space-y-2">
          <Label htmlFor="address">Адрес доставки</Label>
          <Input id="address" value={address} onChange={e => setAddress(e.target.value)} required={deliveryType === 'delivery'} placeholder="Город, улица, дом, квартира" />
        </div>
      )}

      <div className="space-y-2">
          <Label>Дата и время</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ru }) : <span>Выберите дату</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ru}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate()))}
              />
            </PopoverContent>
          </Popover>
          {/* Time selector could be added here */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Особые пожелания</Label>
        <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Например, надпись на торте или предпочтения по декору" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="captcha" checked={captcha} onCheckedChange={(checked) => setCaptcha(Boolean(checked))} />
        <Label htmlFor="captcha" className="text-sm font-normal text-muted-foreground">Я не робот</Label>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Оформить заказ
      </Button>
    </form>
  );
}
