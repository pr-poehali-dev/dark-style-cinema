import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [driveType, setDriveType] = useState('');
  const [power, setPower] = useState('');
  const [speed, setSpeed] = useState('');
  const [ratio, setRatio] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateDrive = () => {
    if (!power || !speed || !ratio) return;
    
    const P = parseFloat(power);
    const n = parseFloat(speed);
    const i = parseFloat(ratio);
    
    const torque = (9549 * P) / n;
    const outputSpeed = n / i;
    const outputTorque = torque * i;
    
    setResult({
      inputTorque: torque.toFixed(2),
      outputSpeed: outputSpeed.toFixed(2),
      outputTorque: outputTorque.toFixed(2)
    });
  };

  const driveTypes = [
    { value: 'belt', label: 'Ременная передача', efficiency: 0.95 },
    { value: 'chain', label: 'Цепная передача', efficiency: 0.97 },
    { value: 'gear', label: 'Зубчатая передача', efficiency: 0.98 },
    { value: 'worm', label: 'Червячная передача', efficiency: 0.85 }
  ];

  const formulas = [
    { name: 'Момент на валу', formula: 'M = 9549 × P / n', units: 'Н·м' },
    { name: 'Передаточное число', formula: 'i = n₁ / n₂', units: '-' },
    { name: 'Окружная скорость', formula: 'v = π × d × n / 60000', units: 'м/с' },
    { name: 'Мощность', formula: 'P = M × ω / 1000', units: 'кВт' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Settings" className="text-blue-400" size={28} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                КинемаРасчет
              </h1>
            </div>
            <nav className="flex space-x-6">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <Icon name="Home" size={16} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <Icon name="Calculator" size={16} className="mr-2" />
                Калькулятор
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Справочник
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Помощь
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-800">
            <TabsTrigger value="home" className="data-[state=active]:bg-blue-600">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-blue-600">
              <Icon name="Calculator" size={16} className="mr-2" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="reference" className="data-[state=active]:bg-blue-600">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Справочник
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-blue-600">
              <Icon name="HelpCircle" size={16} className="mr-2" />
              Помощь
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="mt-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Кинематический расчет приводов
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Профессиональный инструмент для расчета механических передач с высокой точностью
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {driveTypes.map((drive, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all hover:bg-gray-900/70">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
                      <Icon name="Cog" className="text-blue-400" size={24} />
                    </div>
                    <CardTitle className="text-white text-lg">{drive.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-400">
                      КПД: <span className="text-blue-400 font-semibold">{(drive.efficiency * 100).toFixed(0)}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                <Icon name="Play" size={16} className="mr-2" />
                Начать расчет
              </Button>
            </div>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Calculator" className="mr-3 text-blue-400" size={24} />
                    Параметры расчета
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="drive-type" className="text-gray-300">Тип передачи</Label>
                    <Select value={driveType} onValueChange={setDriveType}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Выберите тип передачи" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {driveTypes.map((drive) => (
                          <SelectItem key={drive.value} value={drive.value} className="text-white">
                            {drive.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="power" className="text-gray-300">Мощность, кВт</Label>
                      <Input
                        id="power"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                        placeholder="1.5"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="speed" className="text-gray-300">Частота вращения, об/мин</Label>
                      <Input
                        id="speed"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        placeholder="1500"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ratio" className="text-gray-300">Передаточное число</Label>
                    <Input
                      id="ratio"
                      value={ratio}
                      onChange={(e) => setRatio(e.target.value)}
                      placeholder="3.5"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button 
                    onClick={calculateDrive}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!power || !speed || !ratio}
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Рассчитать
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="BarChart3" className="mr-3 text-green-400" size={24} />
                    Результаты расчета
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">Входной момент</div>
                          <div className="text-2xl font-bold text-white">{result.inputTorque} <span className="text-sm text-gray-400">Н·м</span></div>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">Выходная частота</div>
                          <div className="text-2xl font-bold text-white">{result.outputSpeed} <span className="text-sm text-gray-400">об/мин</span></div>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">Выходной момент</div>
                          <div className="text-2xl font-bold text-white">{result.outputTorque} <span className="text-sm text-gray-400">Н·м</span></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Calculator" className="mx-auto text-gray-600 mb-4" size={48} />
                      <p className="text-gray-400">Введите параметры и нажмите "Рассчитать"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reference Tab */}
          <TabsContent value="reference" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="BookOpen" className="mr-3 text-purple-400" size={24} />
                    Основные формулы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formulas.map((formula, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">{formula.name}</h4>
                          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{formula.units}</span>
                        </div>
                        <code className="text-blue-400 font-mono">{formula.formula}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Cog" className="mr-3 text-orange-400" size={24} />
                    Типы передач
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {driveTypes.map((drive, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-white font-semibold">{drive.label}</h4>
                          <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                            КПД {(drive.efficiency * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {drive.value === 'belt' && 'Плавная работа, низкая стоимость, средняя точность'}
                          {drive.value === 'chain' && 'Высокая надежность, постоянное передаточное число'}
                          {drive.value === 'gear' && 'Высокая точность, компактность, высокий КПД'}
                          {drive.value === 'worm' && 'Большое передаточное число, самоторможение'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="HelpCircle" className="mr-3 text-blue-400" size={24} />
                    Руководство пользователя
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Как использовать калькулятор</h3>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-start space-x-3">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                          <div>
                            <strong>Выберите тип передачи</strong> из выпадающего списка
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                          <div>
                            <strong>Введите параметры:</strong> мощность (кВт), частоту вращения (об/мин) и передаточное число
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                          <div>
                            <strong>Нажмите "Рассчитать"</strong> для получения результатов
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Обозначения</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="text-gray-300"><strong>P</strong> - мощность, кВт</div>
                          <div className="text-gray-300"><strong>n</strong> - частота вращения, об/мин</div>
                          <div className="text-gray-300"><strong>M</strong> - момент, Н·м</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-gray-300"><strong>i</strong> - передаточное число</div>
                          <div className="text-gray-300"><strong>η</strong> - КПД передачи</div>
                          <div className="text-gray-300"><strong>ω</strong> - угловая скорость, рад/с</div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Контакты</h3>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Icon name="Mail" size={16} className="text-blue-400" />
                          <span>support@kinemacalc.ru</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={16} className="text-blue-400" />
                          <span>+7 (495) 123-45-67</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}